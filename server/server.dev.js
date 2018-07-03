// Provide custom regenerator runtime and core-js
require("babel-polyfill");

// Node babel source map support
require("source-map-support").install();

// Javascript require hook
require("babel-register")({
    presets: ["es2015", "react", "stage-0"],
    plugins: ["add-module-exports"]
});

// Css require hook
require("css-modules-require-hook")({
    extensions: [".scss", ".css"],
    preprocessCss: (data, filename) =>
        require("node-sass").renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: "[name]__[local]__[hash:base64:8]"
});

// Image require hook
require("asset-require-hook")({
    name: "/[hash].[ext]",
    extensions: ["jpg", "png", "gif", "webp"],
    limit: 8000
});

const app = require("./app.js"),
    convert = require("koa-convert"),
    webpack = require("webpack"),
    fs = require("fs"),
    path = require("path"),
    devMiddleware = require("koa-webpack-dev-middleware"),
    hotMiddleware = require("koa-webpack-hot-middleware"),
    views = require("koa-views"),
    router = require("./routes"),
    clientRoute = require("./middlewares/clientRoute"),
    config = require("../build/webpack.dev.config"),
    port = process.env.port || 3000,
    compiler = webpack(config),
    serve = require("koa-static"),
    { restify } = require("./datebase/restify");
// Webpack hook event to write html file into `/views/dev` from `/views/tpl` due to server render
compiler.plugin("emit", (compilation, callback) => {
    const assets = compilation.assets;
    let file, data;

    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key);
            data = assets[key].source();
            fs.writeFileSync(file, data);
        }
    });
    callback();
});

app.use(
    views(path.resolve(__dirname, "../views/dev"), { map: { html: "ejs" } })
);
//-- 静态文件指定(通过地址可直接访问静态文件,减少消耗)
app.use(serve(path.join(__dirname, "../public")));
//-- 自定义rest函数 , 统一处理api返回
app.use(restify());
app.use(clientRoute);
app.use(router.routes());
app.use(router.allowedMethods());
console.log(
    `\n==> 🌎  Listening on port ${port} as dev. Open up http://localhost:${port}/ in your browser.\n`
);
app.use(
    convert(
        devMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        })
    )
);
app.use(convert(hotMiddleware(compiler)));
app.listen(port);
