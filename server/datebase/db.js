const Sequelize = require("sequelize");
const uuid = require("node-uuid");
const moment = require("moment");
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
const ID_TYPE = Sequelize.BIGINT;
function generateId() {
    return uuid.v4();
}
function defineModel(name, attributes) {
    var attrs = {};
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        comment: "唯一id"
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
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue("create_time")).format(
                "YYYY-MM-DD HH:mm:ss"
            );
        }
    };
    attrs.update_time = {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue("update_time")).format(
                "YYYY-MM-DD HH:mm:ss"
            );
        }
    };
    attrs.version = {
        type: Sequelize.INTEGER,
        defaultValue: 0
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function(obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    console.log("will create entity..." + obj);
                    // if (!obj.id) {
                    //     obj.id = generateId();
                    // }
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
    "STRING", //--变长字符串 STRING(50) 长度50
    "CHAR", //-- 定长字符串 CHAR(64) 长度 64
    "TEXT", //-- 指定为文本列 TEXT(tiny) tiny, medium, long ;空表示无限长度
    "INTEGER", //-- 整形
    "BIGINT", //-- 长整型
    "FLOAT", //-- 浮点数
    "REAL", //-- 浮点数
    "DOUBLE", //-- 双精度浮点数
    "DECIMAL", //-- 小数 DECIMAL(10,2) 10位 精度2
    "BOOLEAN", //-- 布尔
    "NOW", //-- 时间默认值
    "TIME", //-- 时间类型
    "DATE", //-- 日期时间类型
    "DATEONLY", //-- 日期类型
    "HSTORE", //-- 键值类型
    "JSON", //--JSON字符串类型
    "JSONB", //--JSONB类型
    "BLOB", //-- 二进制类型
    "RANGE", //--Range类型
    "UUID", //-- UUID类型
    "UUIDV1", //-- UUID V1 默认值
    "UUIDV4", //-- UUID V4 默认值
    "VIRTUAL", //-- 虚拟值
    "ENUM", //-- 枚举
    "ARRAY", //-- 数组
    "GEOMETRY", //-- 几何类型
    "GEOGRAPHY" //-- 地理类型
];
var exp = {
    defineModel: defineModel,
    sync: () => {
        //-- 同步模型到数据库 , 如果force为true , 会在同步在前删除原表
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

// $and: {a: 5}           // AND (a = 5)
// $or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
// $gt: 6,                // > 6
// $gte: 6,               // >= 6
// $lt: 10,               // < 10
// $lte: 10,              // <= 10
// $ne: 20,               // != 20
// $not: true,            // IS NOT TRUE
// $between: [6, 10],     // BETWEEN 6 AND 10
// $notBetween: [11, 15], // NOT BETWEEN 11 AND 15
// $in: [1, 2],           // IN [1, 2]
// $notIn: [1, 2],        // NOT IN [1, 2]
// $like: '%hat',         // LIKE '%hat'
// $notLike: '%hat'       // NOT LIKE '%hat'
// $iLike: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
// $notILike: '%hat'      // NOT ILIKE '%hat'  (PG only)
// $like: { $any: ['cat', 'hat']}
//                        // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike
// $overlap: [1, 2]       // && [1, 2] (PG array overlap operator)
// $contains: [1, 2]      // @> [1, 2] (PG array contains operator)
// $contained: [1, 2]     // <@ [1, 2] (PG array contained by operator)
// $any: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)

// $col: 'user.organization_id' // = "user"."organization_id", with dialect specific column identifiers, PG in this example
// order: [
//     // 转义 username 并对查询结果按 DESC 方向排序
//     ['username', 'DESC'],

//     // 按 max(age) 排序
//     sequelize.fn('max', sequelize.col('age')),

//     // 按 max(age) DESC 排序
//     [sequelize.fn('max', sequelize.col('age')), 'DESC'],

//     // 按 otherfunction(`col1`, 12, 'lalala') DESC 排序
//     [sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'), 'DESC'],

//     // 按相关联的User 模型的 name 属性排序
//     [User, 'name', 'DESC'],

//     // 按相关联的User 模型的 name 属性排序并将模型起别名为 Friend
//     [{model: User, as: 'Friend'}, 'name', 'DESC'],

//     // 按相关联的User 模型的嵌套关联的 Company 模型的 name 属性排序
//     [User, Company, 'name', 'DESC'],
//   ]
