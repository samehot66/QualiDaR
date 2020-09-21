const express = require('express')
const router = express.Router()
const projectRouter = require('./projects/projects')
const keywordRouter = require('./keywords/keywords')
const googleAuth = require('./auth/googleAuth')
<<<<<<< HEAD
const fileRouter = require('./files/files')
const topicRouter = require('./topics/topics')
const phraseRouter = require('./phrases/phrases')
=======
const files = require('./files/files')
const topics = require('./topics/topics')
const phrases = require('./phrases/phrases')
>>>>>>> origin/master
const APIauthMiddleware = require('../utils/APIauth.utils')

// router to another files
router.use('/auth/google', googleAuth)
router.use(APIauthMiddleware.clientApiKeyValidation);
router.use('/projects', projectRouter)
router.use('/keywords', keywordRouter)
<<<<<<< HEAD
router.use('/files', fileRouter)
router.use('/topics', topicRouter)
router.use('/phrases', phraseRouter)
=======
router.use('/files', files)
router.use('/topics', topics)
router.use('/phrases', phrases)
>>>>>>> origin/master

// export the router
module.exports = router