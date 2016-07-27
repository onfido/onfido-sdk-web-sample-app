import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV!=='production';

const config = {
  context: `${__dirname}/src`,
  entry: './index.js',

  output: {
    library: 'Onfido',
    libraryTarget: 'umd',
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'onfido.app.min.js'
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.less'],
    modulesDirectories: [
      `${__dirname}/node_modules`,
      `${__dirname}/src`,
      'node_modules'
    ],
    alias: {
      style: `${__dirname}/src/style`,
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },

  plugins: ([
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: { collapseWhitespace: true }
    })
  ]).concat(ENV==='production' ? [
    new webpack.optimize.OccurenceOrderPlugin()
  ] : []),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  devtool: ENV==='production' ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    colors: true,
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true
  }
};



export default config
