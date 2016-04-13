const configBuilder = require('webpack-focus').configBuilder;
const path = require('path');
const webpack = require('webpack');

// Check if focus libraries should be held locally or read from NPM
const localFocus = process.env.LOCAL_FOCUS ? JSON.parse(process.env.LOCAL_FOCUS) : false;
const customConfig = localFocus ? {
    resolve: {
        alias: {
            'focus-core': path.resolve(process.cwd(), '../focus-core'),
            'focus-components': path.resolve(process.cwd(), '../focus-components'),
            react: path.resolve(process.cwd(), './node_modules/react'),
            numeral: path.resolve(process.cwd(), './node_modules/numeral')
        }
    }
} : {};

module.exports = configBuilder(customConfig, {
    __LOCAL_FOCUS__: localFocus,
    __FOCUS_COMPONENTS_RELATIVE_PATH__: localFocus ? "'../../focus-components/'" : "'../node_modules/focus-components/'",
    entry: ['babel-polyfill', './app/js']
});
