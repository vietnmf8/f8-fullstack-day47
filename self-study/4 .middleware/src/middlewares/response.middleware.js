const responseMiddleware = (_, res, next) => {
    // Nếu thành công!
    res.success = (data, status = 200) => {
        res.status(status).json({
            status: "success",
            data,
        });
    };

    // Nếu lỗi
    res.error = (error, status = 500) => {
        res.status(status).json({
            status: "error",
            error,
        });
    };

    next();
};

module.exports = responseMiddleware;
