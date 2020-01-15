/* config-overrides.js */
const { override, fixBabelImports } = require("customize-cra")
const webpackConfig = require('./webpack.config')
const addWebpackModules = () => (config, env) => {
  config = { ...config, ...webpackConfig }
  console.log(config.resolve)

  return config
}
// module.exports = override(
//   addWebpackModules()
// )

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  })
  // addWebpackModules()
);