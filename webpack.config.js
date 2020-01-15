const path = require('path');
module.exports = {
  // test: /\.worker\.ts$/,
  // use: { 
  //   loader: 'worker-loader',
  //   options: { 
  //     inline: true
  //   }
  // }
  resolve: {
    // 设置别名
    alias: {
      '&': path.resolve(__dirname, 'src'),
    },
  }
}