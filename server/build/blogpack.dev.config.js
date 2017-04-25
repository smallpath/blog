const blogpack = require('../blogpack')
const base = require('./blogpack.base.config')

const config = Object.assign({}, base, {
  plugins: base.plugins.concat([
    new blogpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
      'process.BROWSER': true
    })
  ])
})

module.exports = config
