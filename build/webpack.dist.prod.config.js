const path = require('path');
const merge = require('webpack-merge');
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'epc.min.js',
    library: {
      root: 'Epc',
      commonjs: 'element-public-components'
    },
    libraryTarget: "umd"
  },
  // library打包时不将vue打包进去，由引用library者提供，
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: "vue",
      amd: 'vue'
    }
  },
  plugins: [
    // 抽离css
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]-[hash:8].css',
      chunkFilename: '[id]-[hash:8].css',
    }),
    new OptimizeCSSAssetsWebpackPlugin(),  // 压缩CSS
    // new CleanWebpackPlugin(
    //     ['dist/hbf.min.js'],
    //     {
    //         root: path.join(__dirname, '../'),
    //         verbose: true,
    //         dry: false
    //     }
    // ),
  ]
})
