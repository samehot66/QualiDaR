const express = require('express')
const router = express.Router()
const db = require('../../config/db.config.js');
const Project = db.project
const ProjectRole = db.project_role
const User = db.user
const Topic = db.topic

router.get('', (req, res) =>{
    db.sequelize.query('SELECT topics.tid, topics.tname, users.email, users.uid, project_roles.role FROM topics JOIN users ON topics.uid = users.uid JOIN projects ON topics.pid = projects.pid JOIN project_roles ON topics.pid = project_roles.pid AND topics.uid = project_roles.uid WHERE projects.pid = ' + req.query.pid + ';')
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

module.exports = router