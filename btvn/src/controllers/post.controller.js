const postModel = require("@/models/post.model");

/**
 * Controller xử lý logic nghiệp vụ cho Post
 */
const postController = {
    /* Lấy danh sách toàn bộ bài viết */
    getAll: (req, res) => {
        const posts = postModel.findAll();
        return res.json(posts); // Tự động chuyển sang dạng JSON
    },

    /* Lấy chi tiết một bài post */
    getById: (req, res) => {
        const post = postModel.findById(req.params.id);
        if (!post)
            return res.status(404).json({ message: "Post không tồn tại!" });
        return res.json(post);
    },

    /* Tạo bài post mới */
    create: (req, res) => {
        const { title, content } = req.body;
        // Kiểm tra dữ liệu đầu vào cơ bản
        if (!title || !content)
            return res
                .status(400)
                .json({ message: "Thiếu tiêu đề hoặc nội dung" });

        const newPost = postModel.create({ title, content });
        return res.status(201).json(newPost);
    },

    /* Cập nhật post */
    update: (req, res) => {
        const updated = postModel.update(req.params.id, req.body);
        if (!updated)
            return res.status(404).json({ message: "Bài post không tồn tại" });
        return res.json(updated);
    },

    /* Xoá bài post */
    delete: (req, res) => {
        const isDeleted = postModel.delete(req.params.id);
        if (!isDeleted)
            return res.status(404).json({ message: "Bài post không tồn tại" });
        // Trả về 204 No Content khi xoá thành công
        return res.status(204).send();
    },
};

module.exports = postController;
