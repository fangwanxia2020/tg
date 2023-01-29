'use strict'
const path = require('path')
const productionGzipExtensions = ['js','css'];
const defaultSettings = require('./src/settings.js');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname,dir)
}
const name = defaultSettings.title;
const port = 9528; // dev portcdn
module.exports = {
  publicPath: (process.env.NODE_ENV === 'production') ? "./" : '/',
  outputDir: 'dist',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true, //浏览器自动打开页面
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: null //配置跨域
  },
  configureWebpack: (config) => {
    config.name = name;
    //入口文件
    config.entry.app = ['babel-polyfill','./src/main.js'];
    if (process.env.NODE_ENV === 'production') {
      // 打包生产.gz压缩包
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
  },
  chainWebpack(config) {
    //命名
    config.resolve.alias.set('@',resolve('src'))
    config.resolve.alias.set('vue$','vue/dist/vue.esm.js')
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set preserveWhitespace
    config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
      options.compilerOptions.preserveWhitespace = true
      return options
    }).end()
    config.when(process.env.NODE_ENV === 'development',config => config.devtool('cheap-source-map'))
    config.when(process.env.NODE_ENV !== 'development',config => {
      config.plugin('ScriptExtHtmlWebpackPlugin').after('html').use('script-ext-html-webpack-plugin',[{
        // `runtime` must same as runtimeChunk name. default is `runtime`
        inline: /runtime\..*\.js$/
      }]).end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs', // 打包后的文件名
            test: /[\\/]node_modules[\\/]/, // 匹配对应文件
            priority: 10, // 优先级配置，优先匹配优先级更高的规则，不设置的规则优先级默认为0
            chunks: 'initial' //打包规则
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 31,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          },
          tyPc: {
            name: 'chunk-tyPc',
            priority: 25,
            test: /[\\/]node_modules[\\/]_?ty-pc(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
    })
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@/assets/styles/variable.scss";
        `
      }
    }
  }
}
