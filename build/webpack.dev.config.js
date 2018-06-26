const path = require("path"),
    webpack = require("webpack"),
    autoprefixer = require("autoprefixer"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    ProgressBarPlugin = require("progress-bar-webpack-plugin");
module.exports = {
    devtool: "eval-source-map",
    context: path.resolve(__dirname, ".."),
    entry: {
        bundle: [
            "./client",
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=200"
        ],
        vendor: ["react", "react-dom", "redux", "react-redux", "superagent"]
    },
    output: {
        path: path.resolve(__dirname, "../dist/client"),
        filename: "[name].js",
        chunkFilename: "chunk.[name].js",
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"],
                    plugins: [
                        //
                        ["import", { libraryName: "antd", style: "css" }] //需要配置的地方
                    ] //
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "style",
                    "css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]!postcss!sass"
                )
            },
            {
                test: /\.css$/,
                //-- 先加载css然后再渲染视图
                loader: ExtractTextPlugin.extract("css-loader")
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react", "stage-0", "react-hmre"],
                    plugins: ["transform-runtime", "add-module-exports"],
                    cacheDirectory: true,
                    compact: false
                }
            },
            {
                test: /\.(jpg|png|gif|webp)$/,
                loader: "url?limit=8000"
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.html$/,
                loader: "html?minimize=false"
            }
        ]
    },
    postcss: [autoprefixer({ browsers: ["> 5%"] })],
    resolve: { extensions: ["", ".js", ".json", ".scss", ".css"] },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"],
            filename: "[name].js"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename: "../views/dev/index.html",
            template: "./views/tpl/index.tpl.html"
        }),
        new ProgressBarPlugin({ summary: false }),
        new ExtractTextPlugin("[name].[contenthash:8].css", {
            allChunks: true
        })
    ]
};
