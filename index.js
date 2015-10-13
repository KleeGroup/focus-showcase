const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

new WebpackDevServer(webpack(webpackConfig), {
    publicPath: '/dist/',
    hot: true,
    historyApiFallback: true
}).listen(3000, 'localhost', (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Webpack dev server listening at localhost:3000`);
});
