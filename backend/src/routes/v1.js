const router = require('express').Router()

const HandleFileRouter = require('../apiServices/handlerFiles/routes')

router.get('/', (req, res) => {
  return res.status(200).json({ status: 'ok', msg: 'Api v1', data: 'Fecha creación 16/03/2022' })
})

router.use('/files', HandleFileRouter)

module.exports = router
