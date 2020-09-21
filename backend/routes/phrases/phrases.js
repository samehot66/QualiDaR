const express = require('express')
const router = express.Router()
const db = require('../../config/db.config.js');
const Project = db.project
const ProjectRole = db.project_role
const User = db.user
const Topic = db.topic
const Topic_pdffiles = db.topic_pdffiles
const Keywordgroup_topics = db. keywordgroup_topics
const Pdffiles = db.pdf_file
const Keywordgroups = db.keyword_group
const Phrases = db.phrase
<<<<<<< HEAD
<<<<<<< HEAD
const PdfText = db.pdf_text
=======
>>>>>>> origin/master
=======
const PdfText = db.pdf_text
>>>>>>> origin/master

router.get('', (req, res)=>{
    Phrases.findAll({
        where: { tid: req.query.tid, kid: req.query.kid }
    }).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
<<<<<<< HEAD
<<<<<<< HEAD
        console.log(err)
=======
>>>>>>> origin/master
=======
        console.log(err)
>>>>>>> origin/master
        res.status(500).send(err)
    })
})

router.delete('/delete', (req, res)=>{
    Phrases.destroy({
        where: { phraseid: req.query.phraseid }
    }).then((data)=>{
        if(data==1){
            console.log(data)
            res.status(200).send({ message: 'Delete phrase success!' })
        }else if(data==0){
            console.log(data)
            res.status(404).send({ message: 'Phrase not found!' })
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
})

router.put('/status', (req, res)=>{
    Phrases.findOne({
        where: { phraseid: req.body.phraseid }
    }).then((data)=>{
        if(data){
            data.update({
                status: req.body.status
            }).then((data)=>{
                res.status(200).send({ message: 'Update status success!' })
            }).catch((err)=>{
                res.status(500).send(err)
            })
        }else{
            res.status(404).send({"message": "Phrase not found"})
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
router.put('/edit', (res, req) =>{
    Phrases.findOne({
        where: { phraseid: req.body.phraseid }
    }).then((data)=>{
        if(data){
            data.update({
                text: req.body.text
            }).then((data)=>{
                res.status(200).send({ message: 'Update phrase' + req.body.phraseid + ' text success!' })
            }).catch((err)=>{
<<<<<<< HEAD
=======
                console.log(err)
>>>>>>> origin/master
                res.status(500).send(err)
            })
        }else{
            res.status(404).send({"message": "Phrase not found"})
        }
    }).catch((err)=>{
<<<<<<< HEAD
=======
        console.log(err)
>>>>>>> origin/master
        res.status(500).send(err)
    })
})

router.get('/test', (req, res)=>{
    PdfText.findAll().then((data)=>{
        console.log(data)
        res.status(200).send(data)
    }).catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
})

<<<<<<< HEAD
=======
>>>>>>> origin/master
=======
>>>>>>> origin/master
module.exports = router