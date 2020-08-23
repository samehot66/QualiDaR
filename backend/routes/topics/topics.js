const express = require('express')
const router = express.Router()
const db = require('../../config/db.config.js');
const Project = db.project
const ProjectRole = db.project_role
const User = db.user
const Topic = db.topic
const Topic_pdffiles = db.topic_pdffiles
const Keywordgroup_topics = db. keywordgroup_topics
const Pdffiles = db.pdf_file
const Keywordgroups = db.keyword_group

router.get('', (req, res) =>{
    //db.sequelize.query('SELECT topics.tid, topics.tname, users.email, users.uid, project_roles.role FROM topics JOIN users ON topics.uid = users.uid JOIN projects ON topics.pid = projects.pid JOIN project_roles ON topics.pid = project_roles.pid AND topics.uid = project_roles.uid WHERE projects.pid = ' + req.query.pid + ' ORDER topics.tname BY ASC;')
    Topic.findAll({
        where: { pid: req.query.pid },
        attributes: ['tname', 'tid'],  
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
            order: ['pdfname', 'ASC']
        }, {
            model: Keywordgroups,
            order: ['groupname', 'ASC']
        }],
        order: ['tname', 'ASC']
    }).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

router.post('', (req, res)=>{
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
})

router.put('/finish', (req, res)=>{ //**not update longterm op yet!
    Topic.findOne({
        where: { tid: req.body.tid }
    }).then((data)=>{
        if(data){
            data.update({
                done: true
            }).then((data)=>{
                console.log(data)
                res.status(200).send({ message: 'Update topic status success!' })
            }).catch((err)=>{
                res.status(500).send(err)
            })
        }else{
            res.status(404).send({ message: 'Topic not found!' })
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

module.exports = router