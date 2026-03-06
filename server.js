const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const photoRoutes = require("./routes/photoRoutes");

const app = express();
const PORT = 3000;

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

<<<<<<< HEAD
app.post("/upload", upload.single("photo"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({
        message: "Upload successful",
        file: `/uploads/${req.file.filename}`
    });
});
app.use("/api", authRoutes);
app.post("/api/upload", upload.single("photo"), require("./controllers/photoController").uploadPhoto);
app.use("/api", photoRoutes);
>>>>>>> 068511f9b96cd319cb2b800262979fb952934748

app.get("/images", (req, res) => {
    fs.readdir("./uploads", (err, files) => {
        if (err) return res.json([]);
        const images = files.map(file => `/uploads/${file}`);
        res.json(images);
    });
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});