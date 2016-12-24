var path = require('path')

module.exports = {
  entry: [
    'babel-polyfill', path.resolve(__dirname, 'src') + '/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'es2016'],
          plugins: ['transform-async-to-generator']
        }
      }
    ]
  }
}
