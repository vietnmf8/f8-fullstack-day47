const express = require("express");
const router = express.Router();

/* Database */
const db = {
    users: [
        {
            id: 1,
            title: "Người dùng 1",
        },
        {
            id: 2,
            title: "Người dùng 2",
        },
    ],
};

/* [GET] /api/users */
router.get("/", (req, res) => {
    res.json(db.users);
});

/* 
- [GET] /api/users/1 
*/
router.get("/:id", (req, res) => {
    res.json({
        data: "Detail",
    });
});

/* [POST] /api/users */
router.post("/", (req, res) => {
    console.log(req.body);

    const maxId = Math.max(...db.users.map((t) => t.id));
    const newTask = {
        id: maxId + 1,
        title: req.body.title,
    };
    db.users.push(newTask);
    res.json(db.users);
});

module.exports = router;
