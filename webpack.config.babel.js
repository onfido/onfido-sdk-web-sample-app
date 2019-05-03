import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';

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
    extensions: ['.js', '.json'],
    modules: [
      `${__dirname}/node_modules`,
      `${__dirname}/src`
    ]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [`${__dirname}/src`],
        use: ['babel-loader']
      },
      { test: /\.css$/, use: ["style-loader","css-loader"] }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: { collapseWhitespace: true }
    })
  ],

  stats: { colors: true },

  devtool: "source-map"
};



export default config
