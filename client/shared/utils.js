import request from "superagent";
import CryptoJS from "crypto-js";
var reqUrl = {
    userList: "/api/user/getUserList",
    checkUserLogin: "/api/user/checkUserLogin"
};
/**
 * @param  {Object} options
 * @return {Object}         Return Promise
 */
function ajax(options) {
    const defaults = {
        url: null,
        type: "post",
        data: {}
    };
    let promise, action, url;
    options = Object.assign({}, defaults, options);
    //-- 拼接加密字符串
    let keyStr = "param";
    for (var i = 0; i < options.data.length; i++) {
        if (options.data[i]) {
            keyStr = keyStr + data[i];
        }
    }
    let md51 = CryptoJS.MD5(keyStr).toString();
    options.data.keyStr = md51;
    url = reqUrl[options.url];
    promise = request[options.type](url).withCredentials();
    Object.keys(options).forEach(key => {
        if (!key.match(/url|type|data/)) {
            promise.set(key, options[key]);
        }
    });
    action = options.type === "get" ? "query" : "send";
    return new Promise(resolve => {
        promise[action](options.data)
            .then(res => {
                resolve(res.body);
            })
            .catch(err => {
                let error = { code: "-1", mes: "接口返回错误", data: err };
                resolve(error);
            });
    });
}

/**
 * @return {Object} Return url params
 */
function getURLParams() {
    const search = location.search.slice(1),
        rParam = /([^&]*)=([^&]*)/g;
    let ret = {},
        param;

    while ((param = rParam.exec(search))) {
        ret[param[1]] = param[2];
    }

    return ret;
}

export default {
    ajax,
    getURLParams
};
