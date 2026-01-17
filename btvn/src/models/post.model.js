const { loadDB, saveDB } = require("../../utils/jsonDB");
const RESOURCE = "posts";

/**
 * Thao tác dữ liệu cho Posts
 * Chức năng:
 * * Lấy toàn bộ danh sách bài viết
 * * Lấy chi tiết 1 bài theo ID
 * * Tạo bài viết mới và lưu vào JSON
 * * Cập nhật nội dung bài viết
 * * Xoá bài viết theo ID
 */

const postModel = {
    /* 1. Lấy ra toàn bộ danh sách bài Post */
    findAll: () => loadDB(RESOURCE),

    /* 2. Lấy chi tiết một bài Post */
    findById: (id) => {
        const posts = loadDB(RESOURCE);
        return posts.find((p) => p.id === Number(id));
    },

    /* 3. Tạo mới một bài Post */
    create: (data) => {
        const posts = loadDB(RESOURCE);
        const nextId =
            posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;

        // ...data: title, content
        const newPost = {
            id: nextId,
            ...data,
            createdAt: new Date().toISOString(),
        };

        posts.push(newPost);
        saveDB(RESOURCE, posts);
        return newPost;
    },

    /* 4. Cập nhật thông tin bài Posts */
    update: (id, data) => {
        const posts = loadDB(RESOURCE);
        const index = posts.findIndex((p) => p.id === Number(id));

        if (index === -1) return null;

        posts[index] = { ...posts[index], ...data };
        saveDB(RESOURCE, posts);
        return posts[index];
    },

    /* 5. Xoá một bài posts */
    delete: (id) => {
        const posts = loadDB(RESOURCE);
        const initialLength = posts.length;
        const filteredPosts = posts.filter((p) => p.id !== Number(id));

        if (filteredPosts.length === initialLength) return false;

        saveDB(RESOURCE, filteredPosts);
        return true;
    },
};

module.exports = postModel;
