import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import 'webpack-dev-server'

const config = {
  context: `${__dirname}`,
  entry: './index.tsx',

  output: {
    library: 'OnfidoSampleApp',
    libraryTarget: 'umd',
    path: `${__dirname}/bin/src`,
    publicPath: '/',
    filename: 'onfido.app.min.js',
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', `${__dirname}`],
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        include: [`${__dirname}`],
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
