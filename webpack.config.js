const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      'videojs': 'video.js',
      'window.videojs': 'video.js'
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'LetsDash',
      template: 'static/index.ejs'
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'config': path.resolve(__dirname, 'config.js'),
      'jsonpath': path.resolve(__dirname, 'node_modules/jsonpath/jsonpath.js'),
      'videojs-contrib-hls': path.resolve(__dirname, 'node_modules/videojs-contrib-hls/dist/videojs-contrib-hls.js'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }
}
