require("module-alias/register");

/* Khai báo */
const express = require("express");
const apiRouter = require("@/routes");

const app = express();
const port = 3001;

/* Middleware */
app.use(express.json());

/* [GET] / */
app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/api", apiRouter);

/* Listen */
app.listen(port, () => {
    console.log(`Đang lắng nghe tại cổng: ${port}`);
});
