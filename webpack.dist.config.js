const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
const env = process.env.NODE_ENV;

const config = {
  entry: {
    'my-react-library': [`${APP_DIR}/index.js`]
  },

  externals: [
    'react', 'react-dom', 'fbjs', 'prop-types', 'styled-components'
  ],

  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].js',
    library: 'my-react-library',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: ['style', 'css']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file',
            options: {
              query: {
                hash: 'sha512',
                digest: 'hex',
                name: 'name=[hash].[ext]'
              }
            }
          },
          {
            loader: 'image-webpack',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                }
              }
            }
          }
        ]
      }
    ]
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

module.exports = config;
