const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const response = {
        data: [
            { id: 1, title: "Title post 1" },
            { id: 2, title: "Title post 2" },
        ],
    };
    res.json(response);
});

module.exports = router;
