import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { Configuration } from 'webpack'

const config: Configuration = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
}
export default config
