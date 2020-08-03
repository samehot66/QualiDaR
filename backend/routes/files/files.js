const express = require('express')
const router = express.Router()
const axios = require('axios');
const { readdirSync } = require('fs')
const db = require('../../config/db.config.js');
const Project = db.project
const User = db.user
const Pdffiles = db.pdf_file

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
      res.status(500).send(err)
    })
    console.log(email)

    var project = await Project.findOne({
      attributes : ['pname'],
      where: { pid: req.body.pid }
    }).then((data) => {
      return data.dataValues.pname
    }).catch((err) => {
      res.status(500).send(err)
    })
    console.log(project)

    const getDirectories = source =>
      readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    console.log(getDirectories('../backend/public/upload/'))

    Pdffiles.create({
      pdfname: file.name,
      uri: `../backend/public/upload/${file.name}`,
      size: file.size,
      uid: req.body.uid,
      pid: req.body.uid
    }).then((data) => {
      return data
    }).catch((err) => {
      res.status(500).send(err)
    })

    file.mv(`../backend/public/upload/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `../backend/public/uploads/${file.name}` })
      performTask(file.name)
      //.then(()=>{
        
      /*})
      .catch((err)=>{
        res.status(500).send(err)
      });*/
    });
  });

  performTask = (fileName) => {
    axios.post("http://localhost:5000/task", {
        file: `D:/Project/QBRRS/QBDRRs/backend/public/upload/${fileName}`
    }).then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
      }).catch((err)=>{
          console.log(err)
      })
  }

module.exports = router