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
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.vue$/,
        include: path.resolve('src'),
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
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
