// const env = process.env.NODE_ENV_MODE;
// const path = require('path');

// const webpack = require('webpack');


module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8098,
    compress: true,
    open: true,
    openPage: '#/pages/applicationsIndex/applicationsIndex',
    proxy: {
      '/new/api': {
        target: 'http://mall.jsh.com',
        // target: 'https://new.jsh.com',
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
