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
      // Webpack Plugin that generates html file and injects our bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E.'
      }),

      // Injects our custom sercive worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Creates a manifest.JSON file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'J.A.T.E.',
        short_name: 'JATE',
        description: 'Just Another Text Editor ;)',
        start_url: '/',
        display: 'fullscreen',
        background_color: '#BBBDBF',
        theme_color: '#8A8A8A',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],

      }),
    ],

    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],

        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // babel-loader for ES6 compatibility 
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },

          },
        },
      ],
    },
  };
};
