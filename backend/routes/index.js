const express = require('express')
const router = express.Router()
const projectRouter = require('./projects/projects')
const googleAuth = require('./auth/googleAuth')
const APIauthMiddleware = require('./utils/APIauth.utils')

// router to another files
router.use('/auth/google', googleAuth)
app.use(APIauthMiddleware.clientApiKeyValidation);
router.use('/projects', projectRouter)

// export the router
module.exports = router