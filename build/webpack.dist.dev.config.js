const path = require('path');
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
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
        filename: 'epc.js',
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
    plugins:[
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