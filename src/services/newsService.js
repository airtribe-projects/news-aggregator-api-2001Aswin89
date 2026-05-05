const axios = require("axios");
const { getCache, setCache } = require("../utils/cache");
const BASE_URL = "https://gnews.io/api/v4/search";


async function fetchNews({ keywords = [], categories = [] }) {
    const queryParts = [...keywords, ...categories];

    const query =
        queryParts.length > 0
            ? queryParts.join(" OR ")
            : "latest news";

    const cacheKey = query.toLowerCase();

    const cached = getCache(cacheKey);
    if (cached) {
        console.log("CACHE HIT");
        return cached;
    }

    console.log("CACHE MISS");

    const response = await axios.get(BASE_URL, {
        params: {
            q: query,
            token: process.env.NEWS_API_KEY,
            lang: "en",
            max: 10,
        },
    });

    const transformed = response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.image,
        source: article.source?.name,
        publishedAt: article.publishedAt,
    }));

    setCache(cacheKey, transformed);

    return transformed;
}

function searchArticles(articles, keyword) {
    const lower = keyword.toLowerCase();

    return articles.filter(article =>
        article.title?.toLowerCase().includes(lower) ||
        article.description?.toLowerCase().includes(lower)
    );
}

module.exports = { fetchNews, searchArticles };
