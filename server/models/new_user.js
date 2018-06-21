import db from "../datebase/db";
module.exports = db.defineModel("new_user", {
    user_name: { type: db.STRING(50), allowNull: false },
    password: {
        type: db.STRING(50),
        allowNull: true,
        defaultValue: null
    },
    mobile: {
        type: db.STRING(50)
    },
    address_id: {
        type: db.STRING(50)
    },
    head_img: {
        type: db.STRING(50)
    },
    user_score: {
        type: db.STRING(50),
        allowNull: false,
        defaultValue: 0
    },
    user_money: {
        type: db.STRING(50),
        allowNull: false,
        defaultValue: 0
    },
    user_save_money: {
        type: db.STRING(50),
        allowNull: false,
        defaultValue: 0
    },
    rank_id: {
        type: db.STRING(50)
    },
    disabled: {
        type: db.STRING(50),
        allowNull: false,
        defaultValue: 0
    },
    token: {
        type: db.STRING(100)
    },
    pay_password: {
        type: db.STRING(100)
    }
});
