const express = require("express");
const fs = require("node:fs");
const router = express.Router();
const postFix = ".route.js";

/**
 * Cơ chế tự động quét file .route.js để nạp vào hệ thống
 * Chức năng:
 * * Đọc toàn bộ file trong thư mục routes
 * * Chỉ giữ file có hậu tố .route.js
 * * Duyệt từng file -> Lấy tên route từ tên file
 * * Map router vào đường dẫn dạng /posts, /comments
 */

fs.readdirSync(__dirname)
    .filter((file) => file.endsWith(postFix))
    .forEach((file) => {
        const routeName = file.replace(postFix, "");
        // Gắn route vào route chính: /posts, /comments...
        router.use(`/${routeName}`, require(`./${file}`));
    });

module.exports = router;
