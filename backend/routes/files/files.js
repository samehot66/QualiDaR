const express = require('express')
const router = express.Router()
const axios = require('axios');
const { readdirSync } = require('fs')
const fs = require('fs')
const db = require('../../config/db.config.js');
const Project = db.project
const User = db.user
const Pdffiles = db.pdf_file
const ProjectPdf = db.project_pdffile
const ProjectRole = db.project_role

router.get('', (req, res) => {
  ProjectPdf.findAll({
    attributes: ['pdfid'],
    where: { pid: req.query.pid },
    include: [{
      model: Pdffiles,
      attributes: ['pdfname']
    },
    {
      model: User,
      attributes: ['uid', 'email'],
      include: [{
        model: ProjectRole,
        attributes: ['role']
      }]
    }]
  }).then((data) => {
    console.log(data)
    res.status(200).send(data)
  }).catch((err) => {
    console.log(err)
    res.status(500).send(data)
  })
})

router.post('/upload', async (req, res, next) => {
    console.log(`first`)
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

    console.log(getDirectories('../backend/public/upload/'))
    /*ProjectPdf.create({

    })*/

    var dir = `../backend/public/upload/${req.body.pid}/${email}`;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true}, err => { console.log(err) });
    }

    file.mv(`../backend/public/upload/${req.body.pid}/${email}/${file.name}`,async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      

      var pdfid

      var uploadPDF = await Pdffiles.create({
        pdfname: file.name,
        uri: `../backend/public/upload/${req.body.pid}/${email}/${file.name}`,
        size: file.size,
        status: 'uploaded'
      }).then((data) => {
        pdfid = data.dataValues.pdfid
        console.log(data.dataValues.pdfid)
      }).catch((err) => {
        console.log(err)
        //return res.status(500).send(err)
      })

      ProjectPdf.create({
        pdfid: pdfid,
        pid: req.body.pid,
        uid: req.body.uid
      }).then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log(err)
        //return res.status(500).send(err)
      })

      createTask(req.body.pid, email, file.name)
      .then((data) => {
        console.log(data)
        performTask(data)
        .then((data) => {
          if(data==200){
            //return res.status(data).send({message: 'Upload file complete!'})
          }else{
            //return res.status(data).send({message: 'An error occur!'})
          }
        }).catch((err)=>
        {
          console.log(err)
          //return res.status(500).send(err)
        })
      }).catch((err)=>
      {
        console.log(err)
        //return res.status(500).send(err)
      })

      res.json({ fileName: file.name, filePath: `../backend/public/uploads/${req.body.pid}/${email}/${file.name}`})
      //.then(()=>{
        
      /*})
      .catch((err)=>{
        res.status(500).send(err)
      });*/
    });
  });

  createTask = async (pid, email, fileName) => {
    var promise = await axios.post("http://localhost:5000/task", {
        file: `../backend/public/upload/${pid}/${email}/${fileName}`
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
      console.log(res)
      if(res.statusCode==201){
        return 200
      }else{
        return 500
      }

    }).catch((err)=>{
          console.log(err)
          return err
      })
  }

module.exports = router