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

      res.json({ fileName: file.name, filePath: `../backend/public/uploads/${req.body.pid}/${email}/${file.name}` })
      //.then(()=>{
        
      /*})
      .catch((err)=>{
        res.status(500).send(err)
      });*/
    });
  });

  createTask = (pid, email, fileName) => {
    axios.post("http://localhost:5000/task", {
        file: `../backend/public/upload//${pid}/${email}${fileName}`
    }).then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
      }).catch((err)=>{
          console.log(err)
      })
  }

module.exports = router