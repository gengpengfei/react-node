import model from "../model";
async function getUserInfo(ctx) {
    var userModel = model.new_user_model;
    var userList = await userModel.findAll();
    ctx.rest(userList);
}

async function checkUserLogin(ctx) {
    var param = ctx.request.body;
    var userModel = model.new_user_model;
    try {
        var userInfo = await userModel.findOne({
            where: { user_name: param.userName, password: param.password }
        });

        if (userInfo === null) {
            ctx.rest({ code: "-1", mes: "请核对您的账号或密码", data: [] });
        }
        console.log("checkUserLogin-userInfo:", userInfo);
        var data = { code: "1", mes: "用户登录成功", data: userInfo };
        ctx.rest(data);
    } catch (err) {
        ctx.rest({ code: "-1", mes: "网络延时请稍后重试", data: err });
    }
}
export default { getUserInfo, checkUserLogin };
