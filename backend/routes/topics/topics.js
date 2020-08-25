const express = require('express')
const router = express.Router()
const axios = require('axios');
const db = require('../../config/db.config.js');
const Project = db.project
const ProjectRole = db.project_role
const User = db.user
const Topic = db.topic
const Topic_pdffiles = db.topic_pdffiles
const Keywordgroup_topics = db. keywordgroup_topics
const Pdffiles = db.pdf_file
const Keywordgroups = db.keyword_group
const PdfTexts = db.pdf_text
const Keywords = db.keyword

router.get('', (req, res) =>{
    //db.sequelize.query('SELECT topics.tid, topics.tname, users.email, users.uid, project_roles.role FROM topics JOIN users ON topics.uid = users.uid JOIN projects ON topics.pid = projects.pid JOIN project_roles ON topics.pid = project_roles.pid AND topics.uid = project_roles.uid WHERE projects.pid = ' + req.query.pid + ' ORDER topics.tname BY ASC;')
    Topic.findAll({
        where: { pid: req.query.pid },
        attributes: ['tname', 'tid', 'done'],
        order: [[ 'tname', 'ASC' ]],  
        include: [{
            model: User,
            attributes: ['uid', 'email'],
            include: [{
                model: Project,
                attributes: ['pid', 'pname']
            }]
        }]
    })
    .then((data) => {
        console.log(data)
        res.status(200).send(data)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
    /*Project.findOne({
        where: { pid: req.query.pid },
        include: [{
            model: Topic
        }]
    }).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(500).send(err)
    })*/
})

router.get('/detail', (req, res)=>{
    Topic.findOne({
        where: { tid: req.query.tid },
        include: [{
            model: Pdffiles,
            order: [['pdfname', 'ASC']]
        }, {
            model: Keywordgroups,
            order: [['groupname', 'ASC']]
        }],
        order: [['tname', 'ASC']]
    }).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
})

router.get('/test', (req, res)=>{
    PdfTexts.findOne({
        where: { pdftextid: req.query.pdftextid }
    }).then((data)=>{
        res.status(200).send(data)
    })
})

router.post('', (req, res)=>{
    Topic.findOne({
        where: { tname: req.body.tname, pid: req.body.pid }
    }).then((data)=>{
        if(data){
            res.status(400).send({ message: 'Topic is already exist in this project!' })
        }else{
            Topic.create({
                tname: req.body.tname,
                pid: req.body.pid,
                uid: req.body.uid,
                done: false
            }).then((data)=>{
                res.status(200).send(data)
            }).catch((err)=>{
                res.status(500).send(err)
            })
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

router.put('/finish', async (req, res) =>{ //**not update longterm op yet!
    var pdfid
    var pid
    var keywordgroups
    Topic.findOne({
        where: { tid: req.body.tid }
    }).then((data)=>{
        console.log(data.dataValues.pid)
        pid = data.dataValues.pid
        if(data){
            data.update({
                done: true
            }).then((data)=>{
                console.log('aaaa' + data)
                //return res.status(200).send({ message: 'Update topic status success!' })
            }).catch((err)=>{
                console.log(err)
                return res.status(500).send(err)
            })
        }else{
            return res.status(404).send({ message: 'Topic not found!' })
        }
    }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err)
    })

    var findGroup = await Keywordgroup_topics.findAll({
        attributes: ['keywordgroupsid'],
        where: { tid: req.body.tid },
        include: [{
            model: Keywordgroups,
            attributes: ['keywordgroupsid'],
            as: 'keywordgroup',
            include: [{
                model: Keywords,
                attributes: ['kid', 'keywordtext'],
            }]
        }]
    }).then((data)=>{
        console.log('5555'+data[0].dataValues.keywordgroup.dataValues.keywords)
        keywordgroups = data[0].dataValues.keywordgroup.dataValues.keywords
    }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err)
    })

    var findFiles = await Topic_pdffiles.findOne({
        where: {tid: req.body.tid},
        attributes: ['pdfid']
    }).then((data)=>{
        console.log('ssss' + data.dataValues.pdfid)
         pdfid = data.dataValues.pdfid
    }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err)
    })
    
    performFindphrases(pdfid, pid, keywordgroups, req.body.tid)

})

performFindphrases = async (pdfid, pid, keywordgroups, tid) =>{
    console.log('asdadasda' + keywordgroups)
    var promise = await axios.post("http://localhost:5000/findphrases", {
        pdfid: pdfid,
        pid: pid,
        keywordgroups: keywordgroups,
        tid: tid
    }).then((res) => {
        console.log(res)
        console.log('createTask: ' + res.data)
        return res.data
      }).catch((err)=>{
          console.log(err)
          return err
      })
      return promise
}

module.exports = router