Basic Setup React Webpack Babel Minimal Boilerplate
Create app folder.
npm init

Summarized Version
1. create new npm project
    npm init
2. install webpack webpack-dev-server 
3. create webpack.config.js with entry and output
4. add src/index.js build/index.html 
5. add start script in package.json with webpack-dev-server 
6. install babel-core babel-preset-env and babel-preset-react and add dependencied in .babelrc
7. add babel-loader in webpack.config.js


Detailed version

babel-dev dependency installations (transpliling/transform code for old browsers from ES6)
`npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`

babel-core => transpiling code from new syntax to js.
preset-react => transforming code from react to vanilla js
preact-env => transforming code ES6 to ES5

webpack-dev depenecy installations
npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin

create .babelrc with presets
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}

wbpack.config.js code till now

module.exports = {
    entry: './src/index.js',
    output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build'
  }
  
}

Keep The index.html file in the same folder as that of path given in the output dir webpack, until mentioned the exclusive html path mentioned in the former.

For JS Code , entry point would be src/index.js (where all the js resides.)

React
npm install --save react react-dom

html loader
npm i html-webpack-plugin html-loader --save-dev

babel-loader will come to action in webpack now.
add 

module.exports = {
    entry: './src/index.js',
    output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
}

react-hot-loader => to see the changes without reloading
npm i -D react-hot loader
webpack.config.js
plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],


Code-Splitting
All data would not merge in single bundle but in different files.
Dynamic imports dows code-splitting

configure code splitting using webpack and babel