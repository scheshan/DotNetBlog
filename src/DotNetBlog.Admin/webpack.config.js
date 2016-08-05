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
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery"
        }),
		new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        })
    ];
}
else{
	entry = [
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
        './index.jsx'
    ];
	plugins = [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = {
    entry: entry,
    output: {
        path: path.normalize(path.join(__dirname, '../DotNetBlog.Web/wwwroot/dist')),
        filename: 'app.js',
        publicPath: "http://localhost:3000/"
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.less$/,
            loaders: ['style', 'css', 'less']
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader"
        }, { 
            test: require.resolve('jquery'), 
            loader: 'expose?jQuery!expose?$' 
        }, {
            test: /\.jsx$/,
            loaders: ["react-hot-loader", "babel-loader"]
        },{
            test: /\.(jpg|gif)$/,
            loader: "url-loader"
        }]
    }
}