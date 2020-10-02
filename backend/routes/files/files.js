const express = require('express')
const router = express.Router()
const axios = require('axios');
const { readdirSync } = require('fs')
const fs = require('fs')
const db = require('../../config/db.config.js');
const Project = db.project
const User = db.user
const Pdffiles = db.pdf_file
const PdfTexts = db.pdf_text
const ProjectPdf = db.project_pdffile
const ProjectRole = db.project_role
const Phrases = db.phrase
const Topic = db.topic
const TopicPdffiles = db.topic_pdffiles
const { Op } = require("sequelize");

router.get('', (req, res) => {
  ProjectPdf.findAll({
    attributes: ['id'],
    where: { pid: req.query.pid },
    include: [{
      model: Pdffiles,
      attributes: ['pdfname', 'description', 'done', 'size', 'uri']
    },
    {
      model: User,
      attributes: ['uid', 'email'],
      include: [{
        model: ProjectRole,
        as: 'user',
        attributes: ['role']
      }]
    }],
    order: [ [Pdffiles , 'pdfname', 'asc'] ]
  }).then((data) => {
    console.log(data)
    res.status(200).send(data)
  }).catch((err) => {
    console.log(err)
    res.status(500).send(err)
  })
})

router.get('/topic/except', (req, res)=>{
  db.sequelize.query('SELECT pdffiles.pdfid, pdffiles.pdfname, pdffiles.status FROM pdffiles JOIN project_pdffiles ON pdffiles.pdfid = project_pdffiles.pdfid JOIN projects ON projects.pid = ' + req.query.pid + ' WHERE pdffiles.pdfid NOT IN (SELECT pdffiles.pdfid FROM topic_pdffiles JOIN pdffiles ON pdffiles.pdfid = topic_pdffiles.pdfid WHERE topic_pdffiles.tid = ' + req.query.tid + ');')
  .then((data)=>{
    res.status(200).send(data[0])
  }).catch((err)=>{
    console.log(err)
    res.status(500).send(err)
  })
})

router.get('/topic', (req, res)=>{
  Topic.findOne({
    where: { tid: req.query.tid },
    include: [{
      model: Pdffiles,
      order: [['pdfname', 'ASC']]
    }]
  }).then((data)=>{
    res.status(200).send(data)
  }).catch((err)=>{
    res.status(500).send(err)
  })
})

router.post('/topic', (req, res)=>{
  Pdffiles.findOne({
    where: { pdfid: req.body.pdfid }
  }).then((data)=>{
    if(data){
      Topic.findOne({
        where: { tid: req.body.tid }
      }).then((data)=>{
        if(data){
          TopicPdffiles.create({
            tid: req.body.tid,
            pdfid: req.body.pdfid,
            topicTid: req.body.tid,
            pdffilePdfid: req.body.pdfid
          }).then((data)=>{
            res.status(200).send(data)
          }).catch((err)=>{
            res.status(500).send(err)
          })
        }else{
          res.status(404).send({ message: 'Topic not found!' })
        }
      })
    }else{
      res.status(404).send({ message: 'PDF not found!' })
    }
  }).catch((err)=>{
    res.status(500).send(err)
  })
})

router.delete('/topic', (req, res) => {
  TopicPdffiles.destroy({
    where: { pdfid: req.query.pdfid, tid: req.query.tid }
  }).then((data)=>{
    if(data==1){
      console.log('success')
      res.status(200).send({ message: 'Remove file ' + req.query.pdfid + ' in topic ' + req.query.tid + ' success!' })
    }else if(data==0){
      console.log('not found')
      res.status(404).send({ message: 'Cannot found file '  + req.query.pdfid + ' in topic ' + req.query.tid })
    }
  }).catch((err)=>{
    res.status(500).send(err)
  })
})

router.delete('', (req, res, next) =>{
  var flag = true
  TopicPdffiles.findAll({
    where:{pdfid: req.query.pdfid},
    include: [{
      model: Topic,
      as: 'topic_role'
    }]
  }).then((data)=>{
    if(data){
    data.forEach(element=>{
      console.log(element.dataValues.topic_role.dataValues.done)
      if(!element.dataValues.topic_role.dataValues.done){
        flag = false
      }
    })}
  }).then((data)=>{
      if(flag){
      ProjectRole.findOne({
        where: { pid: req.query.pid, uid: req.query.uid, role: 'owner' }
      }).then((data)=>{
        if(data){
          Pdffiles.findOne({
            where: {pdfid: req.query.pdfid}
          }).then((data)=>{
            try{
              console.log('uri', data.dataValues.uri)
              fs.unlinkSync(data.dataValues.uri)
            }catch(err){
              console.log('error', err)
              return res.status(500).send(err)
            }
          })
          Pdffiles.destroy({
            where: { pdfid: req.query.pdfid }
          }).then((data)=>{
            if(data==1){
              PdfTexts.destroy({
                where: { pdfid: null }
              }).then((data)=>{
                Phrases.destroy({
                  where: { pdftextid: null }
                }).then((data)=>{
                  ProjectPdf.destroy({
                    where: { pdfid: null }
                  }).then((data)=>{
                    return res.status(200).send({ message: 'Delete file and remove related item complete!' })
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
            }
          }).catch((err)=>{
            console.log(err)
            return res.status(500).send(err)
          })
        }else{
          return res.status(404).send({ message: 'Only owner of project can delete files!' })
        }
      }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err)
      })
    }else{
      return res.status(400).send({ message: 'Cannot delete finding phrases files!' })
    }
  }).catch((err)=>{
    console.log(err)
    return res.status(500).send(err)
  })
})

router.post('/upload', async (req, res, next) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
    var i = file.name.lastIndexOf('.');
    var fileType = file.name.substr(i);

    console.log(fileType)
    if (fileType != '.pdf') {
      return res.status(400).send({ message: 'File type must be .pdf' });
    }
    console.log(`file size: ${file.size} KB`)

    var email = await User.findOne({
      attributes : ['email'],
      where: {uid: req.body.uid}
    }).then((data)=>{
      return data.dataValues.email
    }).catch((err) => {
      return res.status(500).send(err)
    })
    console.log(email)

    var project = await Project.findOne({
      attributes : ['pname'],
      where: { pid: req.body.pid }
    }).then((data) => {
      return data.dataValues.pname
    }).catch((err) => {
      return res.status(500).send(err)
    })
    console.log(project)

    const getDirectories = source =>
      readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    console.log(getDirectories('../build/upload/'))

    var dir = `../build/upload/${req.body.pid}`;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true}, err => { console.log(err) });
    }

    if (fs.existsSync(dir + `/${file.name}`)){
       return res.status(400).send({ message: 'File is already exist in this project!' })
    }

    file.mv(`../build/upload/${req.body.pid}/${file.name}`,async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      

      var pdfid

      var uploadPDF = await Pdffiles.create({
        pdfname: file.name,
        uri: `../build/upload/${req.body.pid}/${file.name}`,
        description: req.body.description,
        size: file.size,
        done: false
      }).then((data) => {
        pdfid = data.dataValues.pdfid
        console.log(data.dataValues.pdfid)
      }).catch((err) => {
        console.log(err)
        return res.status(500).send(err)
      })

      ProjectPdf.create({
        pdfid: pdfid,
        pid: req.body.pid,
        uid: req.body.uid
      }).then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log(err)
        return res.status(500).send(err)
      })

      createTask(req.body.pid, file.name, pdfid)
      .then((data) => {
        console.log(data)
        performTask(data)
        .then((data) => {
          if(data==202){
            console.log('data: ' + data)
            Pdffiles.findOne({
              where: { pdfid: pdfid }
            }).then((data)=>{
              data.update({
                done: true
              }).catch((err)=>{
                console.log(err)
                return res.status(500).send(err)
              })
            }).catch((err)=>{
              console.log(err)
              return res.status(500).send(err)
            })
            return res.status(data).send({message: 'Upload file complete!', fileName: file.name, filePath: `../public/uploads/${req.body.pid}/${file.name}`}) 
          }else{
            console.log(data)
            return res.status(500).send({message: 'An error occur!'})
          }
        }).catch((err)=>
        {
          console.log(err)
          return res.status(500).send(err)
        })
      }).catch((err)=>
      {
        console.log(err)
        return res.status(500).send(err)
      })
    });
  });

  createTask = async (pid, fileName, pdfid) => {
    var promise = await axios.post("http://localhost:5000/task", {
        file: `../build/upload/${pid}/${fileName}`,
        pdfid: pdfid
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

  performTask = async (taskId) => {
    var promise = await axios.put("http://localhost:5000/task/" + taskId)
    .then((res) => {
      console.log(res.status)
      return res.status
    }).catch((err)=>{
          console.log(err)
          return err
      })
      return promise
  }

module.exports = router