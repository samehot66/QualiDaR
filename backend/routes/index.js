const express = require('express')
const router = express.Router()
const projectRouter = require('./projects/projects')

// router to another files
router.use('/projects', projectRouter)
// export the router
module.exports = router