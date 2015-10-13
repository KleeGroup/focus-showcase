const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const WatchIgnorePlugin = webpack.WatchIgnorePlugin;
showcaseConfig = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/app'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'focus-showcase.js',
        publicPath: '/dist/'
    },
    resolve: {
        alias: {
            'focus-components': path.resolve(__dirname, '../focus-components/src')
        },
        fallback: [
            path.resolve(__dirname, '../focus-components/node_modules')
        ]
    },
    resolveLoader: {
        alias: {
            'components-examples': path.resolve(__dirname, './src/example-loader')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /.js$/,
                loaders: ['react-hot', 'babel'],
                include: [
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, '../focus-components/src')
                ]
            },
            {
                test: /\.json$/,
                loaders: ['json']
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                query: { mimetype: 'image/png' }
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};

module.exports = showcaseConfig;