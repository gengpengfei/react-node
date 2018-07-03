import "babel-polyfill";
import serve from "koa-static";
import path from "path";
import views from "koa-views";
import app from "./app";
import router from "./routes";
import clientRoute from "./middlewares/clientRoute";
const port = process.env.port || 3000;

app.use(
    views(path.resolve(__dirname, "../views/prod"), { map: { html: "ejs" } })
);
app.use(serve(path.join(__dirname, "public")));
//-- 自定义rest函数 , 统一处理api返回
import { restify } from "./datebase/restify";
app.use(restify());
app.use(clientRoute);
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);
console.log(
    `\n==> 🌎  Listening on port ${port} as prod. Open up http://localhost:${port}/ in your browser.\n`
);
