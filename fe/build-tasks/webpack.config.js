var path = require('path');

module.exports = {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ["style", "css", "sass"]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    entry: './src/app.js',
    output: {
        path: __dirname,
        publicPath: 'src/',
        filename: 'bundle.js'
    }
};
