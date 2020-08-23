const express = require('express')
const router = express.Router()
const projectRouter = require('./projects/projects')
const keywordRouter = require('./keywords/keywords')
const googleAuth = require('./auth/googleAuth')
const files = require('./files/files')
const topics = require('./topics/topics')
const APIauthMiddleware = require('../utils/APIauth.utils')

// router to another files
router.use('/auth/google', googleAuth)
router.use(APIauthMiddleware.clientApiKeyValidation);
router.use('/projects', projectRouter)
router.use('/keywords', keywordRouter)
router.use('/files', files)
router.use('/topics', topics)

// export the router
module.exports = router