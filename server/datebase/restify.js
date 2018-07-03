//-- REST api 统一返回
module.exports = {
    APIError: function(code, message) {
        this.code = code || "internal:unknown_error";
        this.message = message || "";
    },
    restify: pathPrefix => {
        pathPrefix = pathPrefix || "/api/";
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 绑定rest()方法:
                ctx.rest = data => {
                    ctx.response.type = "application/json";
                    ctx.response.body = data;
                };
                try {
                    await next();
                } catch (e) {
                    // 返回错误:
                    ctx.response.status = 400;
                    ctx.response.type = "application/json";
                    ctx.response.body = {
                        code: "-1",
                        mes: e.message || "internal:unknown_error",
                        data: {}
                    };
                }
            } else {
                await next();
            }
        };
    }
};
