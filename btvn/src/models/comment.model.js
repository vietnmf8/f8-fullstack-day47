const { loadDB, saveDB } = require("../../utils/jsonDB");

const RESOURCE = "comments";

/**
 * Thao tác dữ liệu cho Comments
 */
const commentModel = {
    /* Lấy toàn bộ */
    findAll: () => loadDB(RESOURCE),

    /* Lấy chi tiết */
    findById: (id) => {
        const comments = loadDB(RESOURCE);
        return comments.find((c) => c.id === Number(id));
    },

    /* Tạo mới */
    create: (data) => {
        const comments = loadDB(RESOURCE);
        const nextId =
            comments.length > 0
                ? Math.max(...comments.map((c) => c.id)) + 1
                : 1;

        // ...data: postId, content
        const newComment = {
            id: nextId,
            ...data,
            createdAt: new Date().toISOString(),
        };

        comments.push(newComment);
        saveDB(RESOURCE, comments);
        return newComment;
    },

    /* Cập nhật */
    update: (id, data) => {
        const comments = loadDB(RESOURCE);
        const index = comments.findIndex((c) => c.id === Number(id));

        if (index === -1) return null;

        comments[index] = { ...comments[index], ...data };
        saveDB(RESOURCE, comments);
        return comments[index];
    },

    /* Xoá */
    delete: (id) => {
        const comments = loadDB(RESOURCE);
        const initialLength = comments.length;
        const filteredComments = comments.filter((c) => c.id !== Number(id));

        if (filteredComments.length === initialLength) return false;

        saveDB(RESOURCE, filteredComments);
        return true;
    },
};

module.exports = commentModel;
