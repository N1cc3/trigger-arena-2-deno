import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.base'

const config: Configuration = merge(base, {
  mode: 'production',
})
export default config
