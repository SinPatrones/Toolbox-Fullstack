const { fetchFileData, fetchFileList } = require('./utils')

module.exports.GenerateData = async (specificFile = null) => {
  try {
    let resultPromise

    if (specificFile) {
      const [fileName] = specificFile.split('.')

      const fetchDataArray = [fetchFileData(`${fileName}.csv`)]
      resultPromise = await Promise.allSettled(fetchDataArray)
    } else {
      const list = await fetchFileList()

      const fetchDataArray = list.files.map(obj => {
        return fetchFileData(obj)
      })

      resultPromise = await Promise.allSettled(fetchDataArray)
    }

    const FILENAME_LIST = resultPromise.filter(({ value }) => value.status === 'ok').map(({ value }) => value.data)

    return {
      status: 'ok',
      msg: 'completed',
      data: FILENAME_LIST
    }
  } catch (e) {
    console.log('Error al generar archivos', e)
    return {
      status: 'error',
      msg: 'completed',
      data: null
    }
  }
}
