const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const ip = require('ip')
const webpack = require('webpack')

const config: typeof webpack.Congiguration = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.(css|scss)?$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g)$/i,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {
            '@api': path.join(__dirname, '../../src/api/'),
            '@context': path.join(__dirname, '../../src/context/')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin()
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        historyApiFallback: true,
        hot: true,
        open: true,
        // host: ip.address(),
        port: 7777
    }
}

module.exports = config