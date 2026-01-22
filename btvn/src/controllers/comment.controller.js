const commentModel = require("@/models/comment.model");

/**
 * Controller xử lý logic nghiệp vụ cho Post
 */
const commentController = {
    /* Lấy toàn bộ danh sách comment */
    getAll: (req, res) => {
        const comments = commentModel.findAll();
        return res.json(comments);
    },

    /* Lấy chi tiết comment theo ID */
    getById: (req, res) => {
        const comment = commentModel.findById(req.params.id);
        if (!comment)
            return res.status(404).json({ message: "Không tìm thấy Comment" });
        return res.json(comment);
    },

    /* Tạo comment mới */
    create: (req, res) => {
        const { postId, content } = req.body;
        if (!postId || !content)
            return res
                .status(400)
                .json({ message: "Thiếu postId hoặc content" });

        const newComment = commentModel.create({ postId, content });
        return res.status(201).json(newComment);
    },

    /* Cập nhật comment */
    update: (req, res) => {
        const updated = commentModel.update(req.params.id, req.body);
        if (!updated)
            return res.status(404).json({ message: "Không tìm thấy Comment" });
        return res.json(updated);
    },

    /* Xoá comment */
    delete: (req, res) => {
        const isDeleted = commentModel.delete(req.params.id);
        if (!isDeleted)
            return res.status(404).json({ message: "Không tìm thấy Comment" });
        // Trả về 204 No Content khi xoá thành công
        return res.status(204).send();
    },
};

module.exports = commentController;
