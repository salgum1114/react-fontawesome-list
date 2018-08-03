const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devPort = 8080;
const host = 'localhost';

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: path.resolve(__dirname, 'examples'),
                options: {
                    presets: [
                        ['es2015', { loose: true, modules: false }],
                        'stage-0',
                        'react',
                    ],
                    plugins: [
                        'syntax-async-functions',
                        'react-hot-loader/babel',
                        'syntax-dynamic-import',
                        'dynamic-import-webpack',
                        ['import', { libraryName: 'antd', style: 'css' }],
                        'transform-decorators-legacy',
                    ],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader?importLoaders=1', 'less-loader'],
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[hash].[ext]',
                    limit: 10000,
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true,
                },
            },
        },
        noEmitOnErrors: true,
    },
    resolve: {
        alias: {
            'ag-grid-root': path.resolve(__dirname, '/node_modules/ag-grid'),
        },
    },
    entry: {
        bundle: [
            'babel-polyfill',
            `webpack-dev-server/client?http://${host}:${devPort}`,
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, 'examples/index.js'),
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[hash:16].js',
        chunkFilename: '[id].[hash:16].js',
    },
    devServer: {
        inline: true,
        port: devPort,
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        publicPath: '/',
        historyApiFallback: true,
        host,
        proxy: {
            '/api': {
                target: 'http://localhost',
            },
            '/api/ws': {
                target: 'ws://localhost',
                ws: true,
            },
        },
        headers: {
            'X-Frame-Options': 'sameorigin', // used iframe
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // HMR을 사용하기 위한 플러그인
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${__dirname}/examples/index.html`,
        }),
    ],
};
