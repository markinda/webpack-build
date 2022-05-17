# webpack-build
#### _Install_
```shell script
yarn install
```
# Usage
### Development server

```shell script
yarn start
```

You can view the development server at: http://localhost:3000/

You can view the bundle Analyzer server at: http://192.168.1.38:3000/

### Production build

```shell script
yarn build
```

You can view build in ../dist folder

## Dependencies
#### webpack
- [webpack](https://github.com/webpack/webpack) - Module and asset bundler.
- [webpack-cli](https://github.com/webpack/webpack-cli) - Command line interface for webpack
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server) - Development server for webpack
#### Babel
- [@babel/core](https://yarnpkg.com/package/@babel/core) - Transpile ES6+ to backwards compatible JavaScript
- [@babel/plugin-proposal-class-properties](https://yarnpkg.com/package/@babel/plugin-proposal-class-properties) - Use properties directly on a class (an example Babel config)
- [@babel/preset-env](https://yarnpkg.com/package/@babel/preset-env) - Smart defaults for Babel
#### Loaders
* [babel-loader](https://github.com/babel/babel-loader) - Transpile files with Babel and webpack
* [sass-loader](https://github.com/webpack-contrib/sass-loader) - Load SCSS and compile to CSS
    + sass
    + node-sass
* [html-loader](https://github.com/webpack-contrib/html-loader) - Exports HTML as string. HTML is minimized when the compiler demands.
* [postcss-loader](https://github.com/webpack-contrib/postcss-loader) - Process CSS with PostCSS
    + postcss
    + postcss-preset-env 
* [css-loader](https://github.com/webpack-contrib/css-loader) - Resolve CSS imports
* [style-loader](https://github.com/webpack-contrib/style-loader) - Inject CSS into the DOM
#### Plugins
* [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) - Remove/clean build folders
* [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) - Copy files to build directory
* [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) - Generate HTML files from template
* [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) - Extract CSS into separate files
* [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) - Optimize and minimize CSS assets
* [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) - Optimize and minimize JavaScript

## License

MIT
