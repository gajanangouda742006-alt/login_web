const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const photoRoutes = require("./routes/photoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("uploads")) {
 fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, "uploads/");
 },
 filename: function (req, file, cb) {
  cb(null, Date.now() + path.extname(file.originalname));
 }
});

const upload = multer({ storage: storage });

app.use("/api", authRoutes);
app.post("/api/upload", upload.single("photo"), require("./controllers/photoController").uploadPhoto);
app.use("/api", photoRoutes);

app.get("/images", (req, res) => {

 fs.readdir("./uploads", (err, files) => {

  if (err) return res.json([]);

  const images = files.map(file => `/uploads/${file}`);

  res.json(images);

 });

});

app.listen(3000, () => {
 console.log("Server running at http://localhost:3000");
});