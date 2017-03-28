var path = require('path')
var webpack = require('webpack')
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var args = process.argv;
var release = args.indexOf("--release") > -1;

var entry = []
var plugins = []
if(release){
	entry = [
        './index.jsx'
    ];
	plugins = [		
        //new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        })//,
        //new webpack.optimize.UglifyJsPlugin({minimize: true})
    ];
}
else{
	entry = [
        "webpack-dev-server/client?http://localhost:8080",
        "webpack/hot/only-dev-server",
        './index.jsx'
    ];
	plugins = [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = {
    entry: entry,
    output: {
        path: path.normalize(path.join(__dirname, '../DotNetBlog.Web/wwwroot/dist')),
        filename: 'app.js',
        publicPath: "http://localhost:8080/"
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.jsx$/,
            loaders: ["react-hot-loader", "babel-loader"]
        }, {
            test: /\.js$/,
            loaders: ["babel-loader"]
        },{
            test: /\.(jpg|gif)$/,
            loader: "url-loader"
        }]
    }
}