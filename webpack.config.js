const webpack = require('webpack');
const path = require('path');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    "live": [path.resolve(__dirname, 'src/live.js')],
    "index": [path.resolve(__dirname, 'src/index.js')]
  },
  output: {
    path: path.resolve(__dirname + '/disk'),
    publicPath: '',
    filename: './js/[name].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      include: path.resolve(__dirname, 'src'),
      use: ['style-loader','css-loader','postcss-loader']
    }, {
      test: /\.scss$/,
      include: path.resolve(__dirname, 'src'),
      use: ['style-loader','css-loader','postcss-loader']
    }, {
      test: /\.js[x]?$/,
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
      use: [{
        loader:'babel-loader', 
        options: { presets: ["es2015","stage-0"] }
      }]
    }, {
      test: /\.html$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
            loader: 'html-loader',
            options: {
              interpolate: true
            }
      }]
    }, {
      test: /\.(png|jpg)$/,
      use:[
      {
        loader:'url-loader',
        options:{
          limit:8192,
          name:'images/[hash:8].[name].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),// 热更新模块
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [Autoprefixer({
            browsers: ['last 5 versions']
          })];
        }
      },
      devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './src',
        port: 8080,
        index: __dirname + '/disk',
        host: '0.0.0.0'
      }
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        inject: 'body',
        excludeChunks:['live'],
        hash: true,
        alwaysWriteToDisk: true
    }),
    new HtmlWebpackPlugin({
        filename: 'live.html',
        template: './src/live.html',
        inject: 'body',
        excludeChunks:['index'],
        hash: true,
    }),
    // new webpack.optimize.DedupePlugin(),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackExternalsPlugin([{
      name: 'zepto',
      var: 'zepto',
      url: 'lib/zepto.min.js'
    },{
      name: 'prismplayer',
      var: 'prismplayer',
      url: 'https://g.alicdn.com/de/prismplayer/2.4.0/aliplayer-min.js'
    },{
      name: 'mqttws31',
      var: 'mqttws31',
      url: 'lib/mqttws31.js'
    },{
      name: 'jweixin',
      var: 'jweixin',
      url: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
    },{
      name: 'frozen',
      var: 'frozen',
      url: 'lib/frozen.min.js'
    },{
      name:'vue',
      var:'vue',
      url:'https://cdn.bootcss.com/vue/2.5.13/vue.min.js'
    }], {
      // Resolve local modules relative to this directory
      basedir: __dirname
    }),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/index.html',
      to: __dirname + '/disk/'
    }]),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/live.html',
      to: __dirname + '/disk/'
    }]),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/lib',
      to: __dirname + '/disk/lib'
    }]),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/images',
      to: __dirname + '/disk/images'
    }])
  ]
};
