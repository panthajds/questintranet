var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle2.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          'url-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|css|eot|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000000000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }
    ]
  }
};

// const babelWebpackConfig = require('@nrwl/react/plugins/babel');

// module.exports = config => {
//   config.module.rules.push(
//     {
//       test: /\.svg$/,
//       use: [
//         '@svgr/webpack',
//         'url-loader'
//       ]
//     }
//   );
//   return babelWebpackConfig(config);
// };

module.exports = config;
