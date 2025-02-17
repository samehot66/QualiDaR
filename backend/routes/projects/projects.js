const express = require('express')
const router = express.Router()
const db = require('../../config/db.config.js');
const fs = require('fs')
const Project = db.project
const ProjectRole = db.project_role
const User = db.user
const Topics = db.topic
const Phrases = db.phrase
const Keywordgroup_topics = db.keywordgroup_topics
const Topic_pdffiles = db.topic_pdffiles
const ProjectPdffiles = db.project_pdffile
const PdfTexts = db.pdf_text
const PdfFiles = db.pdf_file

//GET
//URL - http://localhost:4000/api/projects 
//body - {
//          "uid": "#userid#"
//        }
router.get('', async (req,res) => {
  console.log("request ",req)
    var projects = await Project.findAll({
        attributes : ['pid','pname','description', 'createdAt', 'updatedAt'],
        order: [["pname", "ASC"]],
        include: [{
          model: User,
          attributes: ["uid", "email"],
          where:{uid:req.query.uid},
          through: {where: {uid: req.query.uid, role:'owner'}}
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
    console.log(data)
    return data
  }).catch((err) => {
    return res.status(500).send(err)
  })
  //console.log(createProject)
  var registOwner = await ProjectRole.create({
    role: "owner",
    uid: req.body.uid,
    pid: createProject.dataValues.pid,
    projectPid: createProject.dataValues.pid,
    userUid: req.body.uid
  }).then((data) => {
    console.log(data)
    return data
  }).catch((err) => {
    return res.status(500).send(err)
  })
  var responseData = await {
    project: createProject,
    owner: registOwner
  }

  return res.json(responseData)
}else{
  return res.status(400).send({message: "Please enter project name!"})
}
})

router.delete('', async (req, res) => {
  Project.findOne({
    where: { pid: req.query.pid }
  }).then((data)=>{
    console.log('Project obj: ', data)
    if(data){
      ProjectPdffiles.findAll({
        where: { pid: req.query.pid }
      }).then((data)=>{
        if(data){
        console.log('Project PDF obj' + data)
        data.forEach(element => {
          console.log("element pdfid: " + element.dataValues.pdfid)
          PdfFiles.findOne({
            where: { pdfid: element.dataValues.pdfid }
          }).then((data)=>{
            if(data){
              try{
                fs.unlinkSync(data.dataValues.uri)
              }catch(err){
                return res.status(500).send(err)
              }
            }
          }).catch((err)=>{
            console.log(err)
            return res.status(500).send(err)
          })
          PdfFiles.destroy({
            where: { pdfid: element.dataValues.pdfid }
          }).then((data)=>{
            if(data==1){
              PdfTexts.destroy({
                where: { pdfid: null }
              }).catch((err)=>{
                console.log(err)
                return res.status(500).send(err)
              })
            }
          }).catch((err)=>{
            console.log(err)
            return res.status(500).send(err)
          })
        });
        Project.destroy({
          where: {pid: req.query.pid}
        }).then((data)=>{
          if(data==1){
            ProjectRole.destroy({
              where: { pid: null }
            }).catch((err)=>{
              console.log(err)
              return res.status(500).send(err)
            })
            ProjectPdffiles.destroy({
              where: { pid: null }
            }).catch((err)=>{
              console.log(err)
              return res.status(500).send(err)
            })
            Topics.destroy({
              where: { pid: null }
            }).then((data)=>{
              console.log(data)
                if(data==1){
                  console.log('success')
                  Keywordgroup_topics.destroy({
                      where: { tid: null }
                  }).then((data)=>{
                      Topic_pdffiles.destroy({
                          where: { tid: null }
                      }).then((data)=>{
                          Phrases.destroy({
                              where: { tid: null }
                          }).then((data)=>{
                            return res.status(200).send({ message: 'Delete project and remove related item complete!' })
                          }).catch((err)=>{
                              console.log(err)
                              return res.status(500).send(err)
                          })
                      }).catch((err)=>{
                          console.log(err)
                          return res.status(500).send(err)
                      })
                  }).catch((err)=>{
                      console.log(err)
                      return res.status(500).send(err)
                  })
                }else{
                  return res.status(200).send({ message: 'Delete project and remove related item complete!' })
                }
          }).catch((err)=>{
              console.log(err)
              return res.status(500).send(err)
          })
          }else{
            return res.status(404).send({ message: 'Project not found!' })
          }
        }).catch((err)=>{
          console.log(err)
          return res.status(500).send(err)
        })
      }
      }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err)
      })
    }else{
      return res.status(404).send({ message: 'Project not found!' })
    }
  })

  
  /*var deleteProject = await Project.destroy({
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

  await res.json(responseData)*/
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
    }],
    order: [[User, "email", "ASC"]]
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
        pid: req.body.pid,
        projectPid: req.body.pid,
        userUid: data.dataValues.uid
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

router.put('', (req, res) =>{
  ProjectRole.findOne({
    where: {pid: req.body.pid, uid: req.body.uid, role: 'owner'}
  }).then((data)=>{
    if(!data){
      return res.status(404).send({ message: 'Project not found!' })
    }
  }).catch((err)=>{
    console.log(err)
    res.status(500).send(err)
  })

  Project.findOne({
    where: {pid: req.body.pid}
  }).then((data)=>{
    console.log(data)
    if(data){
      data.update({
        pname: req.body.pname,
        description: req.body.description
      }).then((data)=>{
        console.log(data)
        res.status(200).send({ message: 'Update project success!' })
      }).catch((err)=>{
        console.log(err)
        res.status(500).send(err)
      })
    }else{
      res.status(404).send({ message: 'Project not found!' })
    }
  }).catch((err)=>{
        console.log(err)
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
    }],
    order: [[Project, "pname", "ASC"]]
  }).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).send(err)
  })
})

router.get('/checkaccess', (req, res)=>{
  ProjectRole.findOne({
    where: {uid: req.query.uid, pid: req.query.pid},
  }).then((data)=>{
    if(data){
      res.status(200).send({status: true})
    }else{
      res.status(200).send({status: false})
    }
    console.log(data)
  }).catch((err)=>{
    res.status(500).send(err)
  })
})


router.get('/test', (req, res)=>{
  ProjectPdffiles.findAll()
  .then((data)=>{
    data.forEach(element => {
      console.log('element pdfid: ' + element.dataValues.pdfid)
    });
    
    res.status(200).send(data)
  })
})

router.get('/:pid', (req, res)=>{
  console.log("request ",req)
  ProjectRole.findOne({
    where: {pid: req.params.pid, uid: req.query.uid}
  }).then((data)=>{
    if(data){
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
    }else{
      res.status(404).send({"message": "Project not found"})
    }
  }).catch((error) => {
    console.log(error)
    res.status(500).send(error)
  })
})

module.exports = router