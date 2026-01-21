const postModel = require("@/models/post.model");

/* Lấy toàn bộ danh sách post */
const getAll = async (req, res) => {
    const posts = await postModel.findAll();
    res.success(posts);
};

/* Lấy chi tiết 1 post */
const getOne = async (req, res) => {
    const post = await postModel.findOne(req.params.id);

    if (!post) {
        return res.error(
            {
                message: `Tài nguyên không tồn tại ID: ${req.params.id}`,
            },
            404,
        );
    }

    res.success(post); // trả về luôn phần tử đó
};

/* Tạo post mới */
const create = (req, res) => {};

module.exports = { getAll, getOne, create };
