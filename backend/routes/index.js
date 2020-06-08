const express = require('express')
const router = express.Router()
const projectRouter = require('./projects/projects')
const googleAuth = require('./auth/googleAuth')

// router to another files
router.use('/projects', projectRouter)
router.use('/auth/google', googleAuth)
// export the router
module.exports = router