const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

module.exports = {
    entry: paths.ssrEntry,
    target: 'node',
    output: {
      path: paths.ssrBuild,
      filename: 'render.js',
      libraryTarget: 'commonjs2',
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                emitFile: false,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.(js|jsx|mjs)$/,
              include: paths.appSrc,
              loader: require.resolve('babel-loader'),
              options: {
                compact: true,
                cacheDirectory: true,
              },
            },
            {
                test: /\.(ts|tsx)$/,
                include: paths.appSrc,
                use: [
                  {
                    loader: require.resolve('ts-loader'),
                    options: {
                      // disable type checker - we will use it in fork plugin
                      transpileOnly: true,
                      configFile: paths.appTsConfig,
                    },
                  },
                ],
              },
            {
              test: /\.css$/,
              loader: require.resolve('css-loader/locals'),
            },
            {
              test: /\.scss$/,
              use: [
                {
                  loader: require.resolve('css-loader/locals'),
                  options: {
                    importLoaders: 1,
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                  },
                },
                {
                  loader: require.resolve('sass-loader'),
                  options: {
                    includePaths: [paths.styles],
                  },
                },
              ],
            },
            {
              exclude: [/\.js$/, /\.html$/, /\.json$/, /\.ts$/],
              loader: require.resolve('file-loader'),
              options: {
                emitFile: false,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      modules: ['node_modules', paths.appNodeModules].concat(
        // It is guaranteed to exist because we tweak it in `env.js`
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
      ),
    },
    plugins: [
      new webpack.DefinePlugin(env.stringified),
    ],
  };