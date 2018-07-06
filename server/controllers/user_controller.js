import model from "../model";
import fs from "fs";
var userModel = model.new_user_model;
async function getUserList(ctx) {
    var param = ctx.request.body;
    var offset = (param.page - 1) * param.limit,
        limit = param.limit;
    try {
        const userlist = await userModel.findAll({
            attributes: {
                exclude: ["disabled", "pay_password", "password"] //-- 排除查询字段
            },
            offset: offset, //-- 排除前x条数据
            limit: limit, //-- 每页显示x条
            order: [
                // 转义 username 并对查询结果按 DESC 方向排序
                ["create_time", "DESC"]
            ]
        });
        ctx.rest({
            code: "1",
            mes: "用户列表",
            data: userlist
        });
    } catch (err) {
        ctx.rest({ code: "-1", mes: "网络延时请稍后重试", data: err });
    }
}

async function getUserInfo(ctx) {
    var param = ctx.request.body;
    try {
        var userInfo = await userModel.findOne({
            where: { id: param.id } //-- 查询条件
        });
        ctx.rest({
            code: "1",
            mes: "用户详情",
            data: userInfo
        });
    } catch (err) {
        ctx.rest({ code: "-1", mes: "网络延时请稍后重试", data: err });
    }
}
async function destroyUser(ctx) {
    try {
        var userInfo = await userModel.destroy({
            where: {
                id: param.id,
                user_name: {
                    $ne: null //-- 用户名不等于null
                }
            } //--删除条件
        });
        ctx.rest({
            code: "1",
            mes: "删除成功",
            data: userInfo
        });
    } catch (err) {
        ctx.rest({ code: "-1", mes: "网络延时请稍后重试", data: err });
    }
}
async function updateUser(ctx) {
    try {
        var userInfo = await userModel.update(
            {
                mobile: "123"
            },
            {
                where: { id: param.id } //--删除条件
            }
        );
        ctx.rest({
            code: "1",
            mes: "删除成功",
            data: userInfo
        });
    } catch (err) {
        ctx.rest({ code: "-1", mes: "网络延时请稍后重试", data: err });
    }
}
async function checkUserLogin(ctx) {
    var param = ctx.request.body;
    var userModel = model.new_user_model;
    try {
        const userInfo = await userModel.findOne({
            where: { user_name: param.userName }
        });
        if (!userInfo) {
            ctx.rest({
                code: "-1",
                mes: "该账号不存在,请核对您的账号!",
                data: []
            });
            return;
        }
        if (userInfo.password != param.password) {
            ctx.rest({
                code: "-1",
                mes: "密码错误,请重新输入!",
                data: []
            });
            return;
        }
        console.log("checkUserLogin-userInfo:", userInfo);
        ctx.rest({
            code: "1",
            mes: "用户登录成功",
            data: userInfo
        });
    } catch (err) {
        ctx.rest({ code: "-1", mes: "网络延时请稍后重试", data: err });
    }
}
export default { getUserInfo, checkUserLogin, getUserList };
