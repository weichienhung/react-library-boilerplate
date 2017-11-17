const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const EXAMPLES_DIR = path.resolve(__dirname, 'examples');
const BUILD_DIR = path.resolve(__dirname, './examples/__build__');
const APP_DIR = path.resolve(__dirname, 'src');
const env = process.env.NODE_ENV;

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

function buildEntries() {
  return fs.readdirSync(EXAMPLES_DIR).reduce(function (entries, dir) {
    if (dir === 'build')
      return entries;

    var isDraft = dir.charAt(0) === '_';

    if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, dir)))
      entries[dir] = path.join(EXAMPLES_DIR, dir, 'app.jsx');

    return entries;
  }, {});
}

const config = {
  entry: buildEntries(),
  output: {
    path: BUILD_DIR,
    publicPath: '/__build__/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: ['react-hot/webpack','babel']
      },
      {
        test: /\.(scss|css)$/,
        use: ['style', 'css', 'sass']
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
    alias: {
      "my-react-library": path.resolve(__dirname, "./src")
    },
    extensions: ['.js', '.jsx']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    contentBase: './examples',
    disableHostCheck: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
