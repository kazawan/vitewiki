# 📤 express 处理图片上传

::: tip  
🖼️ 图片上传的逻辑就是,使用静态文件夹保全图片文件,使用用户 id 作为文件夹名字例如 `./upload/1/xxx.png`  
💾 使用数据库保存 `image_url` `image_alt` `title` 等信息.

:::

## 📦 依赖

- 🚂 express
- 📁 multer
- 🔑 uuid
- 🛤️ path

## 📁 multer 使用

```sh
npm i multer
```

```js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const uuid = require("uuid");
const path = require("path");
const db = require("./db/db.js");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const { file } = req;
  const { image_alt } = req.body;
  const image_url = file.path;
  // 把 \ 转换为 /
  const image_urltoslash = image_url.replace(/\\/g, "/");
  console.log("image_url", image_urltoslash);
  console.log("image_alt", image_alt);
  const sql = `INSERT INTO images (image_url, image_alt) VALUES (?, ?)`;
  db.run(sql, [image_url, image_alt], (err) => {
    if (err) {
      console.error("插入数据失败", err);
      res.status(500).send("插入数据失败");
      return;
    }
    res.send({
      code: 200,
      msg: "上传成功",
      image_url: image_urltoslash,
      image_alt: image_alt,
    });
  });
});

app.get("/images", (req, res) => {
  console.log("查询数据");
  const sql = `SELECT * FROM images order by created_at desc`;
  db.all(sql, (err, rows) => {
    if (err) {
      console.error("查询数据失败", err);
      res.status(500).send("查询数据失败");
      return;
    }
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
```

## 🗄️ sqlite 配置

`db.js`

```js
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/db.sqlite3", (err) => {
  if (err) {
    console.error("数据库连接失败", err);
    return;
  }
  console.log("数据库连接成功");
});
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)`);

});
module.exports = db;
```
