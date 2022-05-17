const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const fs = require('fs');

const PATHS = {
    src: path.join(__dirname, './frontend'),
    dist: path.join(__dirname, './dist'),
};

const PAGES_DIR = `${PATHS.src}/`;
const PAGES = fs.readdirSync(PATHS.src).filter(fileName => fileName.endsWith('.html'));

module.exports = {
    mode: 'development',
    devServer: {
        static: {
            directory: PATHS.src,
        },
        compress: true,
        port: 3000,
    },
    entry: {
        main: `${PATHS.src}/index.js`,
    },
    output: {
        path: PATHS.dist,
        filename: '[name].bundle.js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin(),
            new CssMinimizerWebpackPlugin(),
        ],
    },
    plugins: [
        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`,
            // excludeAssets: [
            //     /\.css$/,
            //     (asset) => asset.attributes && asset.attributes['x-skip'],
            // ],
        })),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/assets/static`, to: "../dist" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg|mp4)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
}
