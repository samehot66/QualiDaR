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
const PdfText = db.pdf_text

router.get('', (req, res)=>{
    Phrases.findAll({
        where: { tid: req.query.tid, kid: req.query.kid },
        include: [{
            model: PdfText,
            attributes: ['page_number'],
            include: [{
                model: Pdffiles,
                attributes: ['pdfname']
            }]
        }]
    }).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
})

router.get('/multi', (req, res)=>{
    var response = []
    var allKeywords = []
    console.log(req.query.keywords)
    Phrases.findAll({
        where: { tid: req.query.tid },
        include: [{
            model: PdfText,
            attributes: ['page_number'],
            include: [{
                model: Pdffiles,
                attributes: ['pdfname']
            }]
        }],
        order: [
            [ PdfText, Pdffiles, 'pdfname', 'asc' ],
            [ PdfText, 'page_number', 'asc' ]
          ]
    }).then((data)=>{
        //res.status(200).send(data)
        req.query.keywords.forEach(item => {
            var queryJSON = JSON.parse(item)
            allKeywords.push(queryJSON.keywordtext)
        })
        data.forEach(element => {
            var keyFlag = []
            var boolean
            //response.push(element.dataValues.text)
            allKeywords.forEach(keyword=>{
                if(element.dataValues.text.includes(keyword)){
                    keyFlag.push(true)
                }else{
                    keyFlag.push(false)
                }
            })
            for (flag of keyFlag){
                if(!flag){
                    boolean = flag
                    break;
                }
                boolean = flag
            }
            if(boolean){
                response.push(element)
            }
        })
    }).then(()=>{
        res.status(200).send(response)
    }).catch((err)=>{
        console.log(err)
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

router.put('/edit', (req, res) =>{
    Phrases.findOne({
        where: { phraseid: req.body.phraseid }
    }).then((data)=>{
        if(data){
            data.update({
                text: req.body.text
            }).then((data)=>{
                res.status(200).send({ message: 'Update phrase' + req.body.phraseid + ' text success!' })
            }).catch((err)=>{
                console.log(err)
                res.status(500).send(err)
            })
        }else{
            res.status(404).send({"message": "Phrase not found"})
        }
    }).catch((err)=>{
        console.log(err)
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

module.exports = router