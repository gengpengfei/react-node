const Sequelize = require("sequelize");
const uuid = require("node-uuid");
const config = require("./config");
var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);
const ID_TYPE = Sequelize.STRING(50);
function generateId() {
    return uuid.v4();
}
function defineModel(name, attributes) {
    var attrs = {};
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    };
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === "object" && value["type"]) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.create_time = {
        type: Sequelize.STRING,
        allowNull: false
    };
    attrs.update_time = {
        type: Sequelize.STRING,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function(obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    console.log("will create entity..." + obj);
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.create_time = now;
                    obj.update_time = now;
                    obj.version = 0;
                } else {
                    console.log("will update entity...");
                    obj.update_time = now;
                    obj.version++;
                }
            }
        }
    });
}

const TYPES = [
    "STRING",
    "INTEGER",
    "BIGINT",
    "TEXT",
    "DOUBLE",
    "DATEONLY",
    "BOOLEAN"
];

var exp = {
    defineModel: defineModel,
    sync: () => {
        //-- 同步模型到数据库 , 如果force为true , 会在同步在前删除原表
        console.log("process.env.NODE_ENV", process.env.NODE_ENV);
        if (process.env.NODE_ENV !== "production") {
            sequelize.sync({ force: false });
        } else {
            throw new Error(
                "Cannot sync() when NODE_ENV is set to 'production'."
            );
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;
