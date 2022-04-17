const path = require('path')

module.exports = {
  mode: 'development',
  entry: '/src/scripts/Components/Main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
}
