/* Routing: Điều hướng
app.METHOD("/pathname", handler)
*/

const express = require("express");
const rootRouter = require("./routes");
const app = express();
const port = 3000;

app.use("/api", rootRouter);

app.listen(port, () => {
    console.log(`Server đang chạy tại cổng ${port}`);
});
