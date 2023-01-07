const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const PATHS = {
  frontend: path.join(__dirname, './frontend'),
  build: path.join(__dirname, './build'),
};

const isProd = process.env.NODE_ENV === 'production';

const PAGES = fs.readdirSync(`${PATHS.frontend}/html`).filter(fileName => fileName.endsWith('.html'));

console.log(process.env.NODE_ENV);

module.exports = {
  mode: process.env.NODE_ENV,
  cache: false,
  devServer: {
    static: {
      directory: PATHS.build,
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  entry: {
    main: `${PATHS.frontend}/index.js`,
  },
  output: {
    path: PATHS.build,
    filename: 'script/[name].bundle.js',
    assetModuleFilename: '[name][ext]',
  },
  devtool: isProd ? false : 'eval',
  optimization: {
    minimize: isProd,
  },
  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PATHS.frontend}/html/${page}`,
      filename: `./${page}`,
      // excludeAssets: [
      //     /\.css$/,
      //     (asset) => asset.attributes && asset.attributes['x-skip'],
      // ],
    })),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].bundle.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: `${PATHS.frontend}/assets/`, to: "../build/assets/"},
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'js',
          target: 'es2015'
        }
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
