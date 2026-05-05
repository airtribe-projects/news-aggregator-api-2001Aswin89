const newsService = require("../services/newsService");
const prefService = require("../services/preferencesService");

async function getNews(req, res, next) {
    try {
        const userId = req.user.id;

        const prefs = await prefService.getPreferences(userId);

        const news = await newsService.fetchNews({
            keywords: prefs?.keywords || [],
            categories: prefs?.categories || [],
        });

        const transformedArticles = news.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source?.name || article.source
        }));

        res.status(200).json({
            news: transformedArticles
        });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getNews,
};
