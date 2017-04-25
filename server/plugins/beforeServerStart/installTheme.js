const log = require('../../utils/log')
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const models = require('../../model/mongo')

module.exports = class {
  async beforeServerStart() {
    const prefix = '../../theme'
    let fileArr = fs.readdirSync(resolve(prefix))
    for (let i = 0, len = fileArr.length; i < len; i++) {
      let fileName = fileArr[i]
      let theme = require(`${prefix}/${fileName}`)
      let count = await models.theme.find({ name: theme.name }).count().exec()
      if (count === 0) {
        await models.theme.create(theme)
        log.info(`theme ${theme.name} created`)
      }
    }
  }
}
