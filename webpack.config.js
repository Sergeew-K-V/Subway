const path = requier('path')

module.exports = {
  entry: '/src/Components/index.js',
  output: {
    file: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
