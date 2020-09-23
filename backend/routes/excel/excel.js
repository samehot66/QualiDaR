const express = require('express')
const router = express.Router()
const db = require('../../config/db.config.js');
const Topics = db.topic
const TopicPdf = db.topic_pdffiles
const Projects = db.project
const Keywords = db.keyword
const Keywordgroups = db.keyword_group
const Pdffiles = db.pdf_file
const KeywordgroupTopic = db.keywordgroup_topics
const Phrases = db.phrase

router.get('', (req, res)=>{
    Projects.findOne({
        where: { pid: req.query.pid },
        include: [{
            model: Topics,
            include: [{
                model: TopicPdf,
                as: 'topic_role',
                attributes: ['tid', 'pdfid'],
                include: [{
                    model: Pdffiles,
                    as: 'pdf'
                }]
            },{
                model: KeywordgroupTopic,
                as: 'topic_group',
                attributes: ['tid', 'keywordgroupsid'],
                include: [{
                    model: Keywordgroups,
                    as: 'keywordgroup',
                    attributes: ['keywordgroupsid', 'groupname'],
                    include: [{
                        model: Keywords,
                        include: [{
                            model: Phrases,
                            where: { status: 'seen' }
                        }]
                    }]
                }]
            }]
        }]
    }).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
})

module.exports = router