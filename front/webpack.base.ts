import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import { Configuration } from 'webpack'

const config: Configuration = {
  entry: './src/Game.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      { test: /\.(png|jpg|ogg)$/, loader: 'file-loader' },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
}
export default config
