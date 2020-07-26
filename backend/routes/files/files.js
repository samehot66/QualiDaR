const express = require('express')
const router = express.Router()
const axios = require('axios');

router.post('/upload', async (req, res, next) => {
    console.log(`first`)
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
  
    file.mv(`D:/Project/QBRRS/QBDRRs/backend/public/upload/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `/QBDRRs/backend/public/uploads/${file.name}` })
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