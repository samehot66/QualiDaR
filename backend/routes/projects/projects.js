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
  console.log("pname",req.body.pname)
  if((req.body.pname != "" && req.body.pname != null)){
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
}else{
  return res.status(400).send({message: "Please enter project name!"})
}
})

router.delete('', async (req, res) => {
  var deleteProject = await Project.destroy({
    where: {
      pid: req.query.pid
    }
  }).then((data) => {
    return data
  }).catch((err) => {
    res.status(500).send(err)
  })

  var deleteProjectRole = await ProjectRole.destroy({
    where: {
      pid: req.query.pid
    }
  }).then((data) => {
    return data
  }).catch((err) => {
    res.status(500).send(err)
  })

  var responseData = await {
    project: deleteProject,
    role: deleteProjectRole
  }

  await res.json(responseData)
})

router.get('/people', (req, res) => {
  console.log("easdasd",req.query.pid)
  Project.findOne({
    attributes : ['pid','pname','description', 'createdAt', 'updatedAt'],
    where: {pid:req.query.pid}, 
    include: [{
      model: User,
      attributes: ["uid", "email"],
      through: {where: {pid:req.query.pid}}
    }]
  }).then((data)=>{
    console.log('people in project: ', data)
    res.json(data)
  }).catch((err) => {
    res.status(500).send(err)
  })
})

router.post('/people/add', (req, res)=>{
  User.findOne({
    where: {email: req.body.email}
  }).then((data)=>{
    if(data == null){
      res.status(404).send({message: "User not found."})
    }else{
      ProjectRole.create({
        role: "guest",
        uid: data.dataValues.uid,
        pid: req.body.pid
      }).then((data)=>{
        res.json(data)
      }).catch((err) => {
        res.status(500).send(err)
      })
    }
  }).catch((err) => {
    res.status(500).send(err)
  })
})

router.delete('/people', async (req, res) => {
  ProjectRole.findOne({
    where:{uid: req.query.peopleid, pid:req.query.pid}
  }).then((data)=>{
    if(data==null){
      console.log("null")
    }else{
      if(data.dataValues.role=="owner"){
        res.status(400).send({message:"cannot delete owner from project"})
      }else{
        ProjectRole.destroy({
          where:{uid: req.query.peopleid, pid:req.query.pid}
        }).then((data)=>{
          console.log(data)
          if(data==1){
            console.log('success')
            res.status(200).send({message: "Delete people from project success"})
          }else if(data==0){
            console.log('not found')
            res.status(404).send({message: "User or project not found."})
          }
        }).catch((err)=>{
          res.status(500).send(err)
        })
      }
    }
  }).catch((err)=>{
    res.status(500).send(err)
  })
})

router.get('/shared', (req, res)=>{
  User.findOne({
    where: {uid: req.query.uid},
    include: [{
      model: Project,
      attributes: ["pid", "pname", "description"],
      through: {where: {uid:req.query.uid, role:"guest"}}
    }]
  }).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).send(err)
  })
})

router.get('/:pid', (req, res)=>{
  console.log("request ",req)
  Project.findOne({
      attributes : ['pid','pname','description', 'createdAt', 'updatedAt'],
      where: {pid: req.params.pid},
      include: [{
        model: User,
        attributes: ["uid", "email"]
      }]
  }).then((data) => {
      res.json(data);
    }).catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
})


module.exports = router