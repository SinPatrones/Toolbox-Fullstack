const { GenerateData } = require('../../services/fileRepository')

class HandlerFileController {
  static async getFileData (req, res) {
    const { fileName: queryFileName } = req.query
    try {
      const result = await GenerateData(queryFileName)

      const data = result.data.map((fileName) => {
        return require('../../fileRepository/' + fileName.split('.')[0] + '.json')
      })
      if (data.length) {
        return res.json(data)
      }

      return res.status(404).json(data)
    } catch (e) {
      return res.status(500).json({
        status: 'error',
        msg: 'system error'
      })
    }
  }

  static async getAvailableFiles (req, res) {
    try {
      const { data } = await GenerateData()

      return res.json(data)
    } catch (e) {
      return res.status(500).json({
        status: 'error',
        msg: 'system error'
      })
    }
  }
}

module.exports = HandlerFileController
