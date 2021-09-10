const path = require('path');
module.exports = {
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.pug$/,
            oneOf: [
              {
                resourceQuery: /^\?vue/,
                use: ['pug-plain-loader']
              },
              {
                use: ['raw-loader', 'pug-plain-loader']
              }
            ]
          }
        ]
      },
      resolve: {
        alias: {
          src: path.resolve(__dirname, '@')
        }
      },
    }
  }