const express = require("express");
const { getNews, searchNews } = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getNews);
router.get("/search/:keyword", authMiddleware, searchNews);

module.exports = router;
