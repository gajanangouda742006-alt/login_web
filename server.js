const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, "uploads/");
 },
 filename: function (req, file, cb) {
  cb(null, Date.now() + path.extname(file.originalname));
 }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("photo"), (req, res) => {

 if (!req.file) {
  return res.status(400).json({ message: "No file uploaded" });
 }

 res.json({
  message: "Upload successful",
  file: `/uploads/${req.file.filename}`
 });

});

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