const fs = require("node:fs");
/* Tự động xử lý đúng đường dẫn cho mọi hệ điều hành */
const path = require("node:path");

/* Tạo thư mục db nằm ở gốc dự án */
const DB_DIR = path.join(process.cwd(), "db");

/* Đảm bảo (ensure) thư mục db luôn tồn tại */
const ensureDir = () => {
    // Bước 1: Kiểm tra xem thư mục `db` ở root có tồn tại không?
    if (!fs.existsSync(DB_DIR)) {
        // Bước 2: Nếu thư mục chưa tồn tại, lệnh này sẽ tạo thư mục
        // recursive: true:
        // tự tạo tất cả thư mục cha còn thiếu,
        // thay vì chỉ tạo đúng 1 thư mục cuối.
        fs.mkdirSync(DB_DIR, { recursive: true });
    }
};

/**
 * Đọc dữ liệu từ file JSON
 * @param {string} resourceName - Tên tài nguyên (posts/comments)
 * ---
 * Chức năng:
 * * Đảm bảo thư mục DB tồn tại
 * * Tạo đường dẫn đầy đủ đến file JSON
 * * Nếu file chưa có → tạo file mới chứa []
 * * Đọc dữ liệu từ file
 * * Trường hợp file hỏng → trả về mảng rỗng
 */

const loadDB = (resourceName) => {
    // Bước 1: Kiểm tra thư mục db có tồn tại tại thư mục gốc không?
    ensureDir();

    // Bước 2: Tạo đường dẫn đầy đủ của file .json (VD: btvn/db/posts.json)
    const filePath = path.join(DB_DIR, `${resourceName}.json`);

    // Bước 3: Nếu file chưa tồn tại, tạo file mới với mảng rỗng
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 4));
        return [];
    }

    try {
        // Bước 4: Đọc toàn bộ file .json và convert sang object JavaScript
        const content = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(content || []);
    } catch (error) {
        // Trả về mảng rỗng nếu file lỗi format
        return [];
    }
};

/**
 * Lưu dữ liệu vào file JSON
 * @param {string} resourceName - Tên tài nguyên
 * @param {Array} data - Dữ liệu cần lưu
 *  Chức năng:
 * * Đảm bảo thư mục DB tồn tại
 * * Tạo đường dẫn đầy đủ đến file JSON
 * * Ghi đè tất cả vào file .json
 */

const saveDB = (resourceName, data) => {
    ensureDir();
    const filePath = path.join(DB_DIR, `${resourceName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Export
module.exports = { loadDB, saveDB };

/*
-------------------------------------------
JSON phải là một cấu trúc hợp lệ duy nhất, nên phải đọc → chỉnh sửa → ghi lại toàn bộ.
- Ví dụ: thêm 1 post mới vào file posts.json.

const data = loadDB("posts");     // 1. đọc file
data.push(newItem);               // 2. thêm vào mảng
saveDB("posts", data);            // 3. ghi lại toàn bộ file

*/
