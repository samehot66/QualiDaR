const express = require('express')
const router = express.Router()
const db = require('../../config/db.config.js');
const Project = db.project
const ProjectRole = db.project_role

router.get('', async (req,res) => {
    var projects = await Project.findAll({
        attributes : ['pid','name','num_subhead','num_text_component','description']
    }).then((data) => {
        return data
      }).catch((error) => {
        console.log(error)
        res.status(500).send(error)
      })
      var projectOwner = await ProjectRole.findAll({
        attributes : ['id','role','pid','uid'],
        where: {
          uid: req.body.uid
        }
      }).then((data) => {
        //console.log(JSON.stringify(data))
        return data
      }).catch((error) => {
        console.log(error)
        res.status(500).send(error)
      })
      await console.log(projectOwner)
      await console.log(projects)
      var responseData = await {
        projects: projects,
        own: projectOwner
      }
      await res.json(responseData)     
})

module.exports = router