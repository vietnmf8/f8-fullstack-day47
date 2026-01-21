require("module-alias/register");

/* Khai báo */
const express = require("express");
const apiRouter = require("@/routes");
const jsonMiddleware = require("@/middlewares/json.middleware");
const responseMiddleware = require("@/middlewares/response.middleware");
const errorHandlerMiddleware = require("@/middlewares/errorHandler.middleware");
const notFoundMiddleware = require("@/middlewares/notFound.middleware");

// Chỉ cần require vào thôi
require("@/config/database");

const app = express();
const port = 3001;

/* Sử dụng thực tế */
app.use(jsonMiddleware);
app.use(responseMiddleware);

/* [GET] / */
app.get("/", (req, res) => {
    throw new Error("BROKEN"); // Express will catch this on its own.
});

app.use("/api", apiRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); // Áp dụng phía sau nơi văng lỗi

/* Listen */
app.listen(port, () => {
    console.log(`Đang lắng nghe tại cổng: ${port}`);
});
