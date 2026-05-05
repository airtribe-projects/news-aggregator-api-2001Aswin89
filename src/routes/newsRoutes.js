const express = require("express");
const { getNews } = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getNews);

module.exports = router;
