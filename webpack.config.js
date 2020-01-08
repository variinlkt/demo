module.exports = {
  test: /\.worker\.ts$/,
  use: { 
    loader: 'worker-loader',
    options: { 
      inline: true
    }
  }
}