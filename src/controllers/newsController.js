const newsService = require("../services/newsService");
const prefService = require("../services/preferencesService");

async function getNews(req, res) {
    try {
        const userId = req.user.id;

        const prefs = await prefService.getPreferences(userId);

        const news = await newsService.fetchNews({
            keywords: prefs?.keywords || [],
            categories: prefs?.categories || [],
        });

        res.json({
            message: "News fetched successfully",
            count: news.length,
            articles: news,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getNews,
};