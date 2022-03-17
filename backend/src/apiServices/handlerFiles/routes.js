const express = require('express')
const router = express.Router()

const HandlerFileController = require('./controllers')

router.get('/data', HandlerFileController.getFileData)
router.get('/list', HandlerFileController.getAvailableFiles)

module.exports = router
