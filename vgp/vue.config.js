const { defineConfig } = require('@vue/cli-service')
module.exports = {
  chainWebpack: config => {
      config.module.rules.delete('eslint');
  }
}
