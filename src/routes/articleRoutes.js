const express = require("express");
const {
    saveArticle,
    getArticles,
    deleteArticle,
} = require("../controllers/articleController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, saveArticle);
router.get("/", authMiddleware, getArticles);
router.delete("/:id", authMiddleware, deleteArticle);

module.exports = router;