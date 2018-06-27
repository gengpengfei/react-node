import db from "../datebase/db";
module.exports = db.defineModel("new_banner", {
    banner_name: { type: db.STRING(255), allowNull: false }
});
