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
const Pdftexts = db.pdf_text

router.get('', (req, res)=>{
    db.sequelize.query("SELECT phrases.phraseid, pdffiles.pdfname, pdf_texts.page_number, topics.tname, keywordgroups.groupname, keywords.keywordtext, phrases.text FROM projects JOIN topics ON projects.pid = topics.pid JOIN keywordgroup_topics ON keywordgroup_topics.tid = keywordgroup_topics.tid JOIN keywordgroups ON keywordgroups.keywordgroupsid = keywordgroup_topics.keywordgroupsid JOIN keywords ON keywords.keywordgroupsid = keywordgroups.keywordgroupsid JOIN phrases ON phrases.kid = keywords.kid JOIN topic_pdffiles ON topic_pdffiles.tid = topics.tid JOIN pdffiles ON pdffiles.pdfid = topic_pdffiles.pdfid JOIN pdf_texts ON (phrases.pdftextid = pdf_texts.pdftextid && pdffiles.pdfid = pdf_texts.pdfid) WHERE projects.pid = " + req.query.pid + " AND phrases.text IS NOT NULL AND phrases.status = 'seen';")
    /*Projects.findOne({
        where: { pid: req.query.pid },
        attributes: ['pname'],
        include: [{
            model: Topics,
            include: [{
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
                            attributes: ['phraseid', 'text'],
                            where: { status: 'seen' },
                            include: [{
                                model: Pdftexts,
                                attributes: ['pdftextid', 'page_number'],
                                include: [{
                                    model: Pdffiles,
                                    attributes: ['pdfid', 'pdfname', 'uri' ]
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        }],
        order: [[ { model: Topics }, 'tname', 'ASC' ], [[ Topics, {model: KeywordgroupTopic, as: 'topic_group',}, {model: Keywordgroups, as: 'keywordgroup'}, { model: Keywords }, 'keywordtext', 'asc' ]]]*/
    .then((data)=>{
        res.json(data[0])
    }).catch((err)=>{
        console.log(err)
        res.status(500).send(err)
    })
})

module.exports = router