//使用config.js 在不同的环境下读取不同的配置文件

const defaultConfig = "./config-default.js";
// 可设定为绝对路径，如 /opt/product/config-override.js
const testConfig = "./datebase/config-test.js";
const fs = require("fs");

var config = null;
console.log(`NODE_ENV:` + process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
    config = require(testConfig);
} else {
    config = require(defaultConfig);
}
module.exports = config;
