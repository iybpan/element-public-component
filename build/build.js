'use strict'

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

let webpackConfig = (() => {
    switch (process.argv[2]) {
        case 'prod':
            return require('./webpack.dev.config');
        case "dist:dev":
            return require('./webpack.dist.dev.config');
        case "dist:prod":
            return require('./webpack.dist.prod.config');
        default:
            return require('./webpack.dist.prod.config');
    }
})();
const spinner = ora('building for production...');

spinner.start();

// 删除dist包
rm(path.join(path.resolve(__dirname, '../dist'), 'static'), err => {
    if (err) throw err;
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  Build complete.\n'))
    })
})