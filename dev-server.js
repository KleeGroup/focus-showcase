const webpackConfig = require('./webpack.config');
const serverLauncher = require('webpack-focus').serverLauncher;
serverLauncher(webpackConfig, {
    publicPath: '/',
    hot: true,
    stats: { colors: true },
    historyApiFallback: true,
    contentBase: process.cwd()
});
