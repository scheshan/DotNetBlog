var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: ['./index.js'],
    output: {
        path: '../wwwroot/dist/',
        filename: 'app.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['', '.js', '.css', '.scss']
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: 'jquery'
      }),
      //new webpack.optimize.UglifyJsPlugin({
      //    compressor: {
      //        warnings: false,
      //    },
      //}),
      //new webpack.optimize.OccurenceOrderPlugin(),
      //new webpack.DefinePlugin({
      //    'process.env': { NODE_ENV: '"production"' }
      //})
    ],
    module: {
        loaders: [{
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    }
}