const express = require("express");
const app = express();
const port = 3000;

app.get("/users", (req, res) => {
    // Tương tự .end()
    // send: gửi --> gửi về cho Client (Dạng text)
    // json: Giống send() nhưng ở dạng json
    // res.send("Xin chào cả nhà");

    const response = {
        data: [
            { id: 1, name: "John" },
            { id: 2, name: "Peter" },
        ],
    };
    res.json(response);
});

app.get("/posts", (req, res) => {
    const response = {
        data: [
            { id: 1, title: "Title post 1" },
            { id: 2, title: "Title post 2" },
        ],
    };
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server đang chạy tại cổng ${port}`);
});
