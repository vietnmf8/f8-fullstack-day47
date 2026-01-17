const http = require("node:http");
const jsonDB = require("./utils/jsonDB");

/* Đọc file để auto import */
// Bước 1: Require file index.js vào
const { truncateTitle, joinArray, mergeData } = require("./helpers");
// // // Test thử
truncateTitle();
joinArray();
mergeData();

const db = jsonDB.read();
const allowOrigins = ["http://localhost:5173", "http://localhost:5174"];
const server = http.createServer((req, res) => {
    /* Xử lý CORS */
    const rqOrigin = req.headers.origin;
    const validOrigin = allowOrigins.find((_origin) => _origin === rqOrigin);
    const headers = {
        "Content-Type": "application/json",
    };
    if (validOrigin) headers["Access-Control-Allow-Origin"] = validOrigin;

    /* [GET] /api/tasks */
    if (req.method === "GET" && req.url === "/api/tasks") {
        res.writeHead(200, headers);
        res.end(JSON.stringify(db.tasks));
        return;
    }

    /* [POST] /api/tasks */
    if (req.method === "POST" && req.url === "/api/tasks") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
            console.log("Chunk: ", chunk.toString());
        });
        req.on("end", () => {
            const payload = JSON.parse(body);
            const maxId = Math.max(...db.tasks.map((t) => t.id));
            const newTask = {
                id: maxId + 1,
                title: payload.title,
            };
            db.tasks.push(newTask);
            jsonDB.save(db);
            res.writeHead(201, headers);
            res.end(
                JSON.stringify({
                    data: newTask,
                })
            );
        });
        return;
    }

    /* [PUT/PATCH] /api/tasks */
    if (
        ["PUT", "PATCH"].includes(req.method) &&
        req.url.startsWith("/api/tasks/")
    ) {
        res.writeHead(200, headers);
        res.end(
            JSON.stringify({
                status: "SUCCESS",
            })
        );
        return;
    }

    /* CORS: Preflight Request */
    if (req.method === "OPTIONS") {
        headers["Access-Control-Allow-Methods"] = "PUT,PATCH,DELETE";
        headers["access-control-max-age"] = 10; //Cache
        res.writeHead(200, headers);
        res.end("OPTIONS");
        return;
    }

    /* Bypass-CORS */
    if (req.url.startsWith("/bypass-cors")) {
        const queryString = req.url.split("?").pop();
        const param = new URLSearchParams(queryString);
        const originUrl = param.get("url");
        fetch(originUrl, {
            method: req.method,
        })
            .then((response) => {
                headers["Content-Type"] = response.headers.get("Content-Type");
                return response.text();
            })
            .then((result) => {
                res.writeHead(200, headers);
                res.end(result);
            });
        return;
    }

    /* 404 Not Found */
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
    return;
});

server.listen(3000, () => {
    console.log("Máy chủ đang chạy...");
});
