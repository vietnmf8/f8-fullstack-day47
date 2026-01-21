/* Nhiệm vụ: import những route nhỏ */
const express = require("express");
const usersRouter = require("./users.route");
const postsRouter = require("./posts.route");
const router = express.Router();

// .use(): Bắt được mọi METHOD: GET, POST, PUT, PATCH...
router.use("/users", usersRouter);
router.use("/posts", postsRouter);

module.exports = router;
