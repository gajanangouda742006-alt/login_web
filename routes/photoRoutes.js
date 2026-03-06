const express = require("express");
const router = express.Router();
const photo = require("../controllers/photoController");

router.post("/upload",photo.uploadPhoto);
router.get("/photos/:userId",photo.getPhotos);

module.exports = router;