const express = require("express");
const app = express();

const routes = require("./routes");
const cors = require("cors");

app.use(cors());
app.use("/", routes); // 注入登录路由模块

// app.get("/", (req, res) => {
//    res.send("Hello World");
// });

app.listen(4000, () => {
    console.log("server is running");
});