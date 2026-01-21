const pool = require("@/config/database");

class Post {
    async findAll() {
        const [rows, fields] = await pool.query("select * from posts;");
        return rows;
    }
    async findOne(id) {
        const [rows, fields] = await pool.query(
            `SELECT * FROM posts WHERE id = ${id}`,
        );

        return rows[0];
    }
}

module.exports = new Post();
