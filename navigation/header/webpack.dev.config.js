const path = require('path');

const imageminMozjpeg = require('imagemin-mozjpeg');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const WebpackNotifierPlugin = require('webpack-notifier');

const pkg = require('./package.json');

module.exports = {
  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        loaders: [{
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            comments: false,
            plugins: ['transform-vue-jsx', 'transform-runtime'],
            presets: [['env', { modules: false }], 'stage-2', 'es2015']
          }
        }]
      },
      {
        test: /\.vue$/,
        include: path.resolve('src'),
        loader: 'vue-loader'
      },
      {
        test: /\.s?[ca]ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]__[path][name]__[hash:base64:5]'
            }
          },
          {
            loader: 'autoprefixer-loader',
            options: {
              browsers: 'last 2 versions'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      }
    ]
  },

  output: {
    path: path.resolve(''),
    filename: 'index.js',
    libraryTarget: 'umd'
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: false, title: pkg.name }),
    new ImageminPlugin({
      disable: false,
      optipng: {
        optimizationLevel: 7
      },
      gifsicle: {
        optimizationLevel: 3
      },
      pngquant: {
        quality: '65-90',
        speed: 4
      },
      svgo: {
        removeUnknownsAndDefaults: false,
        cleanupIDs: false
      },
      jpegtran: null,
      plugins: [imageminMozjpeg({
        quality: 75
      })]
    })
  ],

  devServer: {
    host: '0.0.0.0'
  },

  resolve: {
    extensions: ['.js', '.vue', '.scss']
  }
};
