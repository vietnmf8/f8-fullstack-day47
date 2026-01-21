const express = require("express");
const router = express.Router();

/* Database */
const db = {
    posts: [
        {
            id: 1,
            title: "Bài đăng 1",
        },
        {
            id: 2,
            title: "Bài đăng 2",
        },
    ],
};

/* [GET] /api/posts */
router.get("/", (req, res) => {
    res.json(db.posts);
});

/* 
- [GET] /api/posts/1 
*/
router.get("/:id", (req, res) => {
    res.json({
        data: "Detail",
    });
});

/* [POST] /api/posts */
router.post("/", (req, res) => {
    console.log(req.body);

    const maxId = Math.max(...db.posts.map((t) => t.id));
    const newTask = {
        id: maxId + 1,
        title: req.body.title,
    };
    db.posts.push(newTask);
    res.json(db.posts);
});

module.exports = router;
