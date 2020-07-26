const express = require('express')
const router = express.Router()

router.post('/upload', (req, res) => {
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
  
      res.json({ fileName: file.name, filePath: `/QBDRRs/backend/public/uploads/${file.name}` });
    });
  });

module.exports = router