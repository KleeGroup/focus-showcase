const webpackConfig = require('./webpack.config');
const serverLauncher = require('webpack-focus').serverLauncher;
serverLauncher(webpackConfig, {
    publicPath: '/',
    hot: true,
    stats: { colors: true },
    historyApiFallback: true,
    contentBase: process.cwd()
});
const host = process.env.DEV_SERVER_HOST || 'localhost';
const port = process.env.DEV_SERVER_PORT || 3000;
