require("module-alias/register");
const express = require("express");
const cors = require("cors");
const routes = require("@/routes");
const app = express();
const PORT = 3001;

/* Cấu hình các domain được phép truy cập */
const allowOrigins = [
    "http://localhost:5173",
    "https://f8-fullstack-day47-frontend.vercel.app",
];

/* Cấu hình CORS middleware */
app.use(
    cors({
        origin: (origin, callback) => {
            // Cho phép các request không có origin
            if (!origin || allowOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        optionsSuccessStatus: 200, // Trả về 200 cho Preflight request
    }),
);

app.get("/", (req, res) => {
    res.send("Hello world");
});

/* Middleware parse JSON body */
app.use(express.json());

/* Gắn toàn bộ route vào prefix: /api */
app.use("/api", routes);

/* Listen */
app.listen(PORT, () => {
    console.log(`Đang lắng nghe tại cổng: ${PORT}`);
});
