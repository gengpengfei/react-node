import React from "react";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import { Provider } from "react-redux";
import routes from "../../client/routes";
import configureStore from "../../client/common/store/configureStore";
import { CookiesProvider } from "react-cookie";
const store = configureStore();
//-- 在系统初始化时 , 加载首页
async function clientRoute(ctx, next) {
    let _renderProps;
    //-- 在视图渲染之前根据路由选择组件
    match(
        { routes, location: ctx.url },
        (error, redirectLocation, renderProps) => {
            _renderProps = renderProps;
        }
    );
    if (_renderProps) {
        await ctx.render("index", {
            root: renderToString(
                <Provider store={store}>
                    {/* 以同步的方式渲染组件 */}
                    <CookiesProvider>
                        <RouterContext {..._renderProps} />
                    </CookiesProvider>
                </Provider>
            ),
            state: store.getState()
        });
    } else {
        await next();
    }
}

export default clientRoute;
