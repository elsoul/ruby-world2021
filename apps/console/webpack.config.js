const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const supportedLocales = ['en-US', 'ja-JP']

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'SOULs RubyWorld Console',
    template: path.resolve(__dirname, 'src/index.html'),
  }),
  new CopyPlugin({
    patterns: [{ from: 'public' }],
  }),
  new webpack.ContextReplacementPlugin(
    /date-fns[/\\]/,
    new RegExp(`[/\\\\](${supportedLocales.join('|')})[/\\\\]index.js$`)
  ),
  new CompressionPlugin(),
]

if (devMode) {
  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    })
  )
  // plugins.push(new BundleAnalyzerPlugin())
}

if (!devMode) {
  plugins.push(new MiniCssExtractPlugin())
  plugins.push(
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    })
  )
}

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    index: './src/index.tsx',
  },
  devtool: devMode ? 'eval' : false,
  devServer: devMode
    ? {
        port: 4020,
        hot: true,
        historyApiFallback: true,
        client: {
          logging: 'info',
          overlay: {
            warnings: false,
            errors: true,
          },
          progress: true,
        },
      }
    : undefined,
  plugins,
  output: {
    filename: devMode ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|ts|tsx)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets:
                      '> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions',
                  },
                ],
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
              ],
              plugins: [
                '@emotion',
                [
                  'babel-plugin-import',
                  {
                    libraryName: '@mui/material',
                    libraryDirectory: '',
                    camel2DashComponentName: false,
                  },
                  'core',
                ],
                [
                  'babel-plugin-import',
                  {
                    libraryName: '@mui/icons-material',
                    libraryDirectory: '',
                    camel2DashComponentName: false,
                  },
                  'icons',
                ],
                '@babel/plugin-transform-runtime',
                [
                  'relay',
                  {
                    artifactDirectory: './src/__generated__',
                  },
                ],
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
