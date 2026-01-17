const express = require("express");
const router = express.Router();
const commentController = require("@/controllers/comment.controller");

/* Quản lý các tuyến đường comment */
router.get("/", commentController.getAll);
router.get("/:id", commentController.getById);
router.post("/", commentController.create);
router.put("/:id", commentController.update);
router.delete("/:id", commentController.delete);

module.exports = router;
