const express = require('express')
const router = express.Router()
const db = require('../../config/db.config.js');
const Keywordgroup = db.keyword_group
const Keyword = db.keyword
const Subscribe = db.subscribe
const ProjectRole = db.project_role
const User = db.user
const Topic = db.topic
const keywordgroupTopics = db.keywordgroup_topics
const Phrases = db.phrase
const { Op, QueryTypes, Sequelize } = require("sequelize");

router.get('', (req, res)=>{
  db.sequelize.query("SELECT keywordgroups.keywordgroupsid, keywordgroups.groupname, users.email FROM keywordgroups JOIN users ON keywordgroups.uid = users.uid && keywordgroups.keywordgroupsid NOT IN (SELECT subscribes.keywordgroupsid FROM subscribes WHERE subscribes.uid = " + req.query.uid + " ) WHERE keywordgroups.shared = 1 AND users.uid != " + req.query.uid + " ORDER BY keywordgroups.groupname ASC;" , { type: QueryTypes.SELECT })
  .then((data)=>{
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
})

router.get('/mygroups', (req, res)=>{
  Keywordgroup.findAll({
    attributes: ["keywordgroupsid", "groupname"],
    where:{uid: req.query.uid},
    order: [["groupname", "ASC"]]
  }).then((data)=>{
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
})

router.get('/topic/keywords', (req, res)=>{
  Topic.findAll({
    attributes: ['tid', 'tname'],
    where: { tid: req.query.tid },
    include: [{
      model: Keywordgroup,
      include: [{
        model: Keyword
      }]
    }],
    order: [
      [ Keywordgroup, Keyword, 'keywordtext', 'asc' ]
    ]
  }).then((data)=>{
    res.status(200).send(data)
  }).catch((err)=>{
    console.log(err)
    res.status(500).send(err)
  })
})

router.get('/usergroups', (req, res)=>{
  User.findAll({
    attributes: ['uid', 'email'],
    where: {uid: req.query.uid},
    include: [{
      model: Keywordgroup,
      attributes: ['keywordgroupsid', 'groupname']
    },{
      model: Subscribe,
      include: [{
        model: Keywordgroup,
        attributes: ['keywordgroupsid', 'groupname', 'uid']
      }]
    }, {
      model: ProjectRole,
      as: 'user',
      attributes: ['role'],
      where: {pid: req.query.pid}
    }]
  }).then((data)=>{
    console.log(data)
    res.json(data)
  }).catch((err) => {
    console.log(err)
    res.status(500).send(err)
  })
})

router.get('/groups', (req, res)=>{
  db.sequelize.query("SELECT keywordgroups.keywordgroupsid, keywordgroups.groupname, users.email FROM keywordgroups JOIN users ON keywordgroups.uid = users.uid && keywordgroups.keywordgroupsid IN (SELECT subscribes.keywordgroupsid FROM subscribes WHERE subscribes.uid = " + req.query.uid + " ) WHERE keywordgroups.shared = 1 ORDER BY keywordgroups.groupname ASC;" , { type: QueryTypes.SELECT })
  .then((data)=>{
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
})

router.get('/topic', (req, res)=>{
  Topic.findOne({
    where: { tid: req.query.tid },
    include: [{
      model: Keywordgroup,
      order: [['groupname', 'ASC']]
    }]
  }).then((data)=>{
    res.status(200).send(data)
  }).catch((err)=>{
    res.status(500).send(err)
  })
})

router.post('', (req, res) => {
  if((req.body.groupname != "" && req.body.groupname != null)){
  Keywordgroup.create({
    groupname: req.body.groupname,
    uid: req.body.uid,
    shared: req.body.shared
  }).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
}else{
  return res.status(400).send({"message": "Please enter keywordgroup name!"})
}
})

router.delete('/subscribe', (req, res) => {
  Keywordgroup.destroy({
    where: {
        keywordgroupsid: req.query.keywordgroupsid
    }
  }).then((data)=>{
    if(data==1){
      Keyword.destroy({
        where: { keywordgroupsid: null }
      }).then((data)=>{
        Phrases.destroy({
          where: { kid: null }
        }).catch((err)=>{
          console.log(err)
          return res.status(500).send(err)
        })
      }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err)
      })

      keywordgroupTopics.destroy({
        where: { keywordgroupsid: null }
      }).then((data)=>{
        return res.status(200).send({ message: 'Delete keyword group and remove related item complete!' })
      }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err)
      })
    }else{
      return res.status(404).send({ message: 'Keyword group not found!' })
    }
  }).catch((err)=>{
    console.log(err)
    return res.status(500).send(err)
  })
    /*Keyword.destroy({
        where: {
            keywordgroupsid: req.query.keywordgroupsid
        }
    }).then((data) => {
        Keywordgroup.destroy({
            where: {
                keywordgroupsid: req.query.keywordgroupsid
            }
          }).then((data) => {
            console.log(data)
            if(data==1){
                console.log('success')
                res.status(200).send({"message": "Unsubscribe success"})
              }else if(data==0){
                console.log('not found')
                res.status(404).send({"message": "Subscription not found."})
              }
          }).catch((err) => {
            res.status(500).send(err)
          })
      }).catch((err) => {
        res.status(500).send(err)
      })*/
})

router.delete('/topic', (req, res) => {
  keywordgroupTopics.destroy({
    where: { keywordgroupsid: req.query.keywordgroupsid, tid: req.query.tid }
  }).then((data)=>{
    if(data==1){
      console.log('success')
      res.status(200).send({ message: 'Remove keyword group ' + req.query.keywordgroupsid + ' in topic ' + req.query.tid + ' success!' })
    }else if(data==0){
      console.log('not found')
      res.status(404).send({ message: 'Cannot found keyword group ' + req.query.keywordgroupsid + ' in topic ' + req.query.tid })
    }
  }).catch((err)=>{
    console.log(err)
    res.status(500).send(err)
  })
})

router.post('/groups', (req, res) => {
  Keywordgroup.findOne({
    where: {keywordgroupsid: req.body.keywordgroupsid, shared: "1"}
  }).then((data)=>{
    if(data){
      Subscribe.create({
        keywordgroupsid: req.body.keywordgroupsid,
        uid: req.body.uid
      }).then((data) => {
        res.json(data)
      }).catch((err) => {
        res.status(500).send(err)
      })
    }else{
      res.status(404).send({"message": "keywordgroup not found"})
    }
  }).catch((err) => {
    res.status(500).send(err)
  })
})

router.delete('/groups', (req, res) => {
    Subscribe.destroy({
        where: {
            keywordgroupsid: req.query.keywordgroupsid,
            uid: req.query.uid
        }
      }).then((data) => {
        console.log(data)
          if(data==1){
            console.log('success')
            res.status(200).send({"message": "Unsubscribe success"})
          }else if(data==0){
            console.log('not found')
            res.status(404).send({"message": "Subscription not found."})
          }
      }).catch((err) => {
        res.status(500).send(err)
      })
})

router.put('', (req, res)=>{
    Keywordgroup.findOne({
        where: {keywordgroupsid: req.body.keywordgroupsid, uid: req.body.uid}
    }).then((data)=>{
        if(data){
            Keywordgroup.update(
                {groupname: req.body.groupname, shared: req.body.shared},
                {where: {keywordgroupsid: req.body.keywordgroupsid}}
            ).then((data)=>{
                res.json(data)
            }).catch((err)=>{
                res.status(500).send(err)
            })
        }else{
            res.status(404).send({"message": "Keywordgroup not found"})
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

router.get('/public', (req, res)=>{
  Keyword.findAll({
    attributes: ["kid", "keywordtext"],
    where: {keywordgroupsid: req.query.keywordgroupsid},
    include:[{
      model: Keywordgroup,
      where: { shared: "1"}
    }]
  }).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

router.get('/private', (req, res)=>{
  Keyword.findAll({
    attributes: ["kid", "keywordtext"],
    where: {keywordgroupsid: req.query.keywordgroupsid, uid: req.query.uid},
    include:[{
      model: Keywordgroup
    }]
  }).then((data)=>{
      res.json(data)
  }).catch((err)=>{
      res.status(500).send(err)
  })
})

router.post('/topic', async (req, res)=>{
  Keywordgroup.findOne({
    where: { keywordgroupsid: req.body.keywordgroupsid }
  }).then((data)=>{
    if(data){
      Topic.findOne({
        where: { tid: req.body.tid }
      }).then((data)=>{
        if(data){
          keywordgroupTopics.create({
            keywordgroupsid: req.body.keywordgroupsid,
            tid: req.body.tid,
            topicTid: req.body.tid,
            keywordgroupKeywordgroupsid: req.body.keywordgroupsid
          }).then((data)=>{
            return res.status(200).send(data)
          }).catch((err)=>{
            return res.status(500).send(err)
          })
        }else{
          return res.status(404).send({ message: 'Topic not found!' })
        }
      }).catch((err)=>{
    return res.status(500).send(err)
  })
    }else{
      return res.status(404).send({ message: 'Keyword group not found!' })
    }
  }).catch((err)=>{
    return res.status(500).send(err)
  })
})

router.post('/private', (req, res)=>{
  Keywordgroup.findOne({
    where: {keywordgroupsid: req.body.keywordgroupsid, uid: req.body.uid}
  }).then((data)=>{
    if(data){
      Keyword.findOne({
        where:{keywordtext: req.body.keywordtext, keywordgroupsid: req.body.keywordgroupsid}
      }).then((data)=>{
        if(data){
          res.status(403).send({"message": "Keyword is already exist!"})
        }else{
          Keyword.create({
            keywordgroupsid: req.body.keywordgroupsid,
            uid: req.body.uid,
            keywordtext: req.body.keywordtext
          }).then((data)=>{
            res.json(data)
        }).catch((err)=>{
            res.status(500).send(err)
        })
        }
      }).catch((err)=>{
        res.status(500).send(err)
    })
    }else{
      res.status(404).send({"message": "Keywordgroup not found"})
    }   
  }).catch((err)=>{
    res.status(500).send(err)
}) 
})

router.delete('', (req, res)=>{
  Keyword.findOne({
    where:{kid: req.query.kid, uid: req.query.uid}
  }).then((data)=>{
    if(data){
      Keyword.destroy({
        where: {kid: req.query.kid, uid: req.query.uid}
      }).then((data)=>{
        console.log(data)
        if(data==1){
          console.log('success')
          res.status(200).send({"message": "Delete keyword from keywordgroup success"})
        }else if(data==0){
          console.log('not found')
          res.status(404).send({"message": "Keyword not found."})
        }
      }).catch((err)=>{
        res.status(500).send(err)
      })
    }else{
      res.status(404).send({"message": "Keyword not found"})
    }
  }).catch((err)=>{
    res.status(500).send(err)
  }) 
})


module.exports = router