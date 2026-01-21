/* Routing: Điều hướng
app.METHOD("/pathname", handler)
*/
require("module-alias/register");
const express = require("express");
const rootRouter = require("@/routes");
const app = express();
const port = 3000;

// Middleware
// truy cập thẳng: http://localhost:3000/uploads/image.png: Tư duy là chúng ta đứng thẳng ở trong file public
app.use(express.static("public")); // public: tính từ thư mục gốc

// Route
app.use("/api", rootRouter);

app.listen(port, () => {
    console.log(`Server đang chạy tại cổng ${port}`);
});
