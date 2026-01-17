const taskModel = require("@/models/task.model");

/**
 * Đặt các hàm controller là async (bất đồng bộ)
 */

/* Lấy toàn bộ danh sách Task */
const getAll = (req, res) => {
    const tasks = taskModel.findAll();
    res.json(tasks);
};

/* Lấy chi tiết 1 task */
const getOne = (req, res) => {
    res.json({
        data: "Detail",
    });
};

/* Tạo task mới */
const create = (req, res) => {
    const newTask = taskModel.create({
        title: req.body.title,
    });
    res.json(newTask);
};

/* Xoá 1 task */
const destroy = (req, res) => {
    //todo: Logic xoá task
};

module.exports = { getAll, getOne, create, destroy };
