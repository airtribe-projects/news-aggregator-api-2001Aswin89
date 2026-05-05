const service = require("../services/articleService");

async function saveArticle(req, res, next) {
    try {
        const userId = req.user.id;

        const article = await service.saveArticle(userId, req.body);

        res.status(201).json({
            message: "Article saved",
            article,
        });
    } catch (err) {
        next(err);
    }
}

async function getArticles(req, res, next) {
    try {
        const userId = req.user.id;

        const articles = await service.getUserArticles(userId);

        res.json({
            message: "Saved articles fetched",
            count: articles.length,
            articles,
        });
    } catch (err) {
        next(err);
    }
}

async function deleteArticle(req, res, next) {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const article = await service.deleteArticle(userId, id);

        res.json({
            message: "Article deleted",
            article,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    saveArticle,
    getArticles,
    deleteArticle,
};
