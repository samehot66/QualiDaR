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
    db.sequelize.query('SELECT topics.tid, topics.tname, users.email, users.uid, project_roles.role FROM topics JOIN users ON topics.uid = users.uid JOIN projects ON topics.pid = projects.pid JOIN project_roles ON topics.pid = project_roles.pid AND topics.uid = project_roles.uid WHERE projects.pid = ' + req.query.pid + ' ORDER BY ASC;')
    .then((data) => {
        console.log(data)
        res.status(200).send(data)
    }).catch((err) => {
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

module.exports = router