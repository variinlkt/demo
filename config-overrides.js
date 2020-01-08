/* config-overrides.js */
const { override } = require("customize-cra")
const webpackConfig = require('./webpack.config')
const addWebpackModules = () => (config, env) => {
  console.log(config.module.rules.find(item => item.hasOwnProperty('oneOf')).oneOf)
  config.module.rules.find(item => item.hasOwnProperty('oneOf')).oneOf.push(webpackConfig)
  return config
}
module.exports = override(
  addWebpackModules()
)