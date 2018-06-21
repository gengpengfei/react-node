if (process.env.NODE_ENV === "production") {
    module.exports = require("./Welcome");
} else {
    module.exports = require("./Root.dev");
}
