import db from "../datebase/db";
import path from "path";
const model = db.defineModel("new_user", {
    user_name: {
        type: db.STRING(50),
        get: function() {
            var user_name = this.getDataValue("user_name");
            // sequelize在___get或者set方法中___,可以通过this可以获取或者设置 model实例 的属性;非get或者set方法中,可不行哦(试过)
            return this.getDataValue("user_name");
        },
        set: function() {
            var title = this.getDataValue("user_name");
            return this.getDataValue("user_name");
        }
    },
    password: {
        type: db.STRING(50)
    },
    mobile: {
        type: db.STRING(50)
    },
    address_id: {
        type: db.INTEGER,
        allowNull: true
    },
    head_img: {
        type: db.STRING(100),
        allowNull: true
    },
    user_score: {
        type: db.INTEGER,
        defaultValue: 0
    },
    user_money: {
        type: db.DECIMAL(10, 2),
        defaultValue: "0.00"
    },
    user_save_money: {
        type: db.DECIMAL(10, 2),
        defaultValue: "0.00"
    },
    rank_id: {
        type: db.INTEGER,
        allowNull: true
    },
    disabled: {
        type: db.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    token: {
        type: db.STRING(100)
    },
    pay_password: {
        type: db.STRING(100),
        allowNull: true
    }
});
db.sync();
module.exports = model;
