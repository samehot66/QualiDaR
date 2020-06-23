const express = require('express')
const router = express.Router()
const db = require('../../config/db.config.js');
const Keywordgroup = db.keyword_group
const Keyword = db.keyword
const Subscribe = db.subscribe
const User = db.user
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

router.get('/groups', (req, res)=>{
  db.sequelize.query("SELECT keywordgroups.keywordgroupsid, keywordgroups.groupname, users.email FROM keywordgroups JOIN users ON keywordgroups.uid = users.uid && keywordgroups.keywordgroupsid IN (SELECT subscribes.keywordgroupsid FROM subscribes WHERE subscribes.uid = " + req.query.uid + " ) WHERE keywordgroups.shared = 1 ORDER BY keywordgroups.groupname ASC;" , { type: QueryTypes.SELECT })
  .then((data)=>{
    res.json(data)
  }).catch((err) => {
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
  return res.status(400).send({message: "Please enter keywordgroup name!"})
}
})

router.delete('', (req, res) => {
    Keyword.destroy({
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
                res.status(200).send({message: "Unsubscribe success"})
              }else if(data==0){
                console.log('not found')
                res.status(404).send({message: "Subscription not found."})
              }
          }).catch((err) => {
            res.status(500).send(err)
          })
      }).catch((err) => {
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
            res.status(200).send({message: "Unsubscribe success"})
          }else if(data==0){
            console.log('not found')
            res.status(404).send({message: "Subscription not found."})
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
    Keywordgroup.findOne({
        attributes: ["keywordgroupsid", "shared", "groupname", "uid", "createdAt", "updatedAt"],
        where: {keywordgroupsid: req.query.keywordgroupsid, shared: "1"}
    }).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

router.get('/private', (req, res)=>{
  Keywordgroup.findOne({
      attributes: ["keywordgroupsid", "shared", "groupname", "uid", "createdAt", "updatedAt"],
      where: {keywordgroupsid: req.query.keywordgroupsid, shared: "0", uid: req.query.uid}
  }).then((data)=>{
      res.json(data)
  }).catch((err)=>{
      res.status(500).send(err)
  })
})

router.post('/private', (req, res)=>{
  Keywordgroup.findOne({
    where: {keywordgroupsid: req.body.keywordgroupsid, uid: req.body.uid}
  }).then((data)=>{
    if(data){
      Keyword.create({
        keywordgroupsid: req.body.keywordgroupsid,
        uid: req.body.uid,
        keywordtext: req.body.keywordtext
      }).then((data)=>{
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


module.exports = router