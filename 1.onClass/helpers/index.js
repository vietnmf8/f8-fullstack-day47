const fs = require("node:fs");

// Đọc toàn bộ thư mục
const fileNames = fs
    .readdirSync("./helpers")
    .filter((_fileName) => _fileName !== "index.js");

// Biến đổi thành object
const helpers = fileNames.reduce((obj, fileName) => {
    return {
        ...obj,
        [fileName.replace(".js", "")]: require(`./${fileName}`),
    };
}, {});

// Export object đó
module.exports = helpers;
