const express = require('express')
const router = express.Router()
const db = require('../../config/db.config.js');
const Project = db.project
const ProjectRole = db.project_role
const User = db.user

//GET
//URL - http://localhost:4000/api/projects 
//body - {
//          "uid": "#userid#"
//        }
router.get('', async (req,res) => {
  console.log("request ",req)
    var projects = await Project.findAll({
        attributes : ['pid','pname','description', 'createdAt', 'updatedAt'],
        include: [{
          model: User,
          where: {uid: req.query.uid},
          attributes: ["uid", "email"]
        }]
    }).then((data) => {
        return data
      }).catch((error) => {
        console.log(error)
        res.status(500).send(error)
      })
      /*var projectOwner = await ProjectRole.findAll({
        attributes : ['id','role','pid','uid', 'createdAt', 'updatedAt'],
        where: {
          uid: req.body.uid
        }
      }).then((data) => {
        if (data.length == 0){
          return {
            message: "no own project"
          }
        }
        console.log(JSON.stringify(data))
        return data
      }).catch((error) => {
        console.log(error)
        res.status(500).send(error)
      })
      //await console.log(projectOwner)
      await console.log(projects)
      var responseData = await {
        projects: projects,
        own: projectOwner
      }*/
      await res.json(projects)     
})

//POST
//URL - http://localhost:4000/api/projects 
//body - {
//          "uid": "#userid#", 
//          "pname": "#project name#", 
//          "description": "#project description#"
//        }
router.post('', async (req, res) => {
  var createProject = await Project.create({
    pname: req.body.pname,
    description: req.body.description
  }).then((data) => {
    return data
  }).catch((err) => {
    res.status(500).send(err)
  })
  //console.log(createProject)
  var registOwner = await ProjectRole.create({
    role: "owner",
    uid: req.body.uid,
    pid: createProject.dataValues.pid
  }).then((data) => {
    return data
  }).catch((err) => {
    res.status(500).send(err)
  })
  var responseData = await {
    project: createProject,
    owner: registOwner
  }

  await res.json(responseData)
})
module.exports = router