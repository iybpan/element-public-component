'use strict'

const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const webpackBaseConfig = require('./webpack.base.config');

const HOST = process.env.HOST
// const PORT = process.env.PORT && Number(process.env.PORT)
const PORT= 8080;

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',

    entry:  path.join(path.join(__dirname, '../'), 'example/main.js'),
    // 输出
    output: {
        path: path.join(__dirname, '../examples/dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        progress: true,
        quiet: true,
        overlay: {
            errors: true,
        },
        port: PORT
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(),// 热加载模块
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../example/index.html'),
            inject: true
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here http://localhost:${PORT}/`],
            },
        })
    ]
})