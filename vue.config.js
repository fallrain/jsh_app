// const env = process.env.NODE_ENV_MODE;
// const path = require('path');

// const webpack = require('webpack');


module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8098,
    compress: true,
    proxy: {
      '/api': {
        target: 'https://',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // },
        secure: false
      }
    }
  },
  chainWebpack: (config) => {
  },
};
