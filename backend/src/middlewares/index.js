const createError = require('http-errors')

module.exports.error404 = function (req, res, next) {
  next(createError(404))
}

module.exports.generalErrorHandler = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    status: 'error',
    msg: 'System error'
  })
}
