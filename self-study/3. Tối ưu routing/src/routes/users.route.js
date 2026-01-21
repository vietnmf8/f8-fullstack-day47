const express = require("express");
const router = express.Router();

const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Peter" },
];

router.get("/", (req, res) => {
    // Tương tự .end()
    // send: gửi --> gửi về cho Client (Dạng text)
    // json: Giống send() nhưng ở dạng json
    // res.send("Xin chào cả nhà");

    const response = {
        data: users,
    };
    res.json(response);
});

router.get("/:id", (req, res) => {
    const userId = +req.params.id;
    const user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: "Not Found" });
    }

    res.json({
        data: user, // Nếu key có value là undefined --> key bị xoá bỏ
    });
});

module.exports = router;
