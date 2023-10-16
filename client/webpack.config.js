const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //webpack plugin to generate html file
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Progressive Web Application text editor',
        filename: 'index.html',
        chunks: ['main'],
      }),
    // inject custom service worker
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'sw.js',
    }),
    // generate manifest file
    new WebpackPwaManifest({
      name: 'Progressive Web Application text editor',
      short_name: 'PWA text editor',
      description: 'A simple text editor',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('src/img/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        },
        {
          src: path.resolve('src/img/large-icon.png'),
          size: '1024x1024', // you can also use the specifications pattern
        },
        {
          src: path.resolve('src/img/maskable-icon.png'),
          size: '1024x1024',
          purpose: 'maskable',
        },
      ],
    }),
],


    module: {
      rules: [
        //CSS loader
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        //Babel loader
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
