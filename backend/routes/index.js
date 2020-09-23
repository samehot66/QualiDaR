const express = require('express')
const router = express.Router()
const projectRouter = require('./projects/projects')
const keywordRouter = require('./keywords/keywords')
const googleAuth = require('./auth/googleAuth')
const fileRouter = require('./files/files')
const topicRouter = require('./topics/topics')
const phraseRouter = require('./phrases/phrases')
const excel = require('./excel/excel')
const APIauthMiddleware = require('../utils/APIauth.utils')

// router to another files
router.use('/auth/google', googleAuth)
router.use(APIauthMiddleware.clientApiKeyValidation);
router.use('/projects', projectRouter)
router.use('/keywords', keywordRouter)
router.use('/files', fileRouter)
router.use('/topics', topicRouter)
router.use('/phrases', phraseRouter)
router.use('/excel', excel)

// export the router
module.exports = router