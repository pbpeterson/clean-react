const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './public/js'),
    publicPath: '/js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.API_URL': 'http://fordevs.herokuapp.com/api/'
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    },
    extensions: ['.ts', '.tsx', '.js', '.scss']
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  devServer: {
    historyApiFallback: true
  }
}
