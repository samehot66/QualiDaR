const express = require('express')
const router = express.Router()
const db = require('../../config/db.config.js');
const Project = db.project

router.get('',(req,res) => {
    Project.findAll({
        attributes : ['pid','name','num_subhead','num_text_component','description']
    }).then((data) => {
        res.json(data)
      }).catch((error) => {
        console.log(error)
        res.status(500).send(error)
      })
})

module.exports = router