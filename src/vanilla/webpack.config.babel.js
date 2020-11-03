import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config = {
  context: `${__dirname}`,
  entry: './index.js',

  output: {
    library: 'OnfidoSampleApp',
    libraryTarget: 'umd',
    path: `${__dirname}/bin/src`,
    publicPath: '/',
    filename: 'onfido.app.min.js',
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', `${__dirname}/src`],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [`${__dirname}/src`],
        use: ['babel-loader'],
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.SDK_TOKEN_FACTORY_SECRET': JSON.stringify(
        process.env.SDK_TOKEN_FACTORY_SECRET || ''
      ),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: { collapseWhitespace: true },
    }),
  ],

  stats: { colors: true },

  devtool: 'source-map',
}

export default config
