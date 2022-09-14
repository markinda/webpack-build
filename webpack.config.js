const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {ESBuildMinifyPlugin} = require('esbuild-loader')
const fs = require('fs');

const PATHS = {
  src: path.join(__dirname, './frontend'),
  dist: path.join(__dirname, './build'),
};

const PAGES_DIR = `${PATHS.src}/html`;
const PAGES = fs.readdirSync(`${PATHS.src}/html`).filter(fileName => fileName.endsWith('.html'));

module.exports = {
  mode: 'development',
  cache: false,
  devServer: {
    static: {
      directory: PATHS.dist,
    },
    open: true,
    compress: true,
    port: 3000,
  },
  entry: {
    main: `${PATHS.src}/index.js`,
  },
  output: {
    path: PATHS.dist,
    filename: 'script/[name].bundle.js',
    assetModuleFilename: '[name][ext]',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
        minify: true,
        legalComments: "none",
        ignoreAnnotations: true,
        treeShaking: true,
        pure: [true]
      }),
    ],
  },
  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
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
        {from: `${PATHS.src}/assets/`, to: "../build/assets/"},
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
