const express = require("express");
const {
    saveArticle,
    getArticles,
    deleteArticle,
    markRead,
    markFavorite,
    getRead,
    getFavorites,
} = require("../controllers/articleController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, saveArticle);
router.get("/", authMiddleware, getArticles);
router.delete("/:id", authMiddleware, deleteArticle);

router.post("/:id/read", authMiddleware, markRead);
router.post("/:id/favorite", authMiddleware, markFavorite);

router.get("/read", authMiddleware, getRead);
router.get("/favorites", authMiddleware, getFavorites);


module.exports = router;
