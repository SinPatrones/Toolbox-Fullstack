const { parse } = require('csv-parse/sync')
const fs = require('fs')
const path = require('path')

const axios = require('axios')

module.exports.fetchFileList = async function () {
  try {
    const response = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
      headers: {
        authorization: 'Bearer aSuperSecretKey'
      }
    })

    if (response) {
      return response.data
    }
  } catch (e) {
    //console.log('\nError to fetch', e)
  }
}

module.exports.fetchFileData = async function (fileName) {
  try {
    const response = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${fileName}`, {
      headers: {
        authorization: 'Bearer aSuperSecretKey'
      }
    })

    if (response) {
      const records = parse(response.data, {
        columns: true,
        skip_empty_lines: true,
        relax_column_count: false,
        skip_records_with_error: true
      })

      const jsonData = {
        file: fileName,
        lines: records.map(line => {
          delete line.file
          return line
        })
      }

      const [fileNameJson] = fileName.split('.')
      const PATH_FILE = path.join(__dirname, '../../fileRepository/', fileNameJson + '.json')

      await fs.writeFileSync(PATH_FILE, JSON.stringify(jsonData))
      return {
        status: 'ok',
        msg: 'file saved',
        data: `${fileNameJson}.csv`
      }
    }
  } catch (e) {
    //console.log(`\nError to fetch file --> ${fileName}`, e?.response.data)
    return {
      status: 'error',
      msg: 'can not save file',
      data: null
    }
  }
}
