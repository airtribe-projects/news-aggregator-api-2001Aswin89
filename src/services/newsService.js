const axios = require("axios");

const BASE_URL = "https://gnews.io/api/v4/search";

async function fetchNews({ keywords = [], categories = [] }) {
    const queryParts = [...keywords, ...categories];

    const query =
        queryParts.length > 0
            ? queryParts.join(" OR ")
            : "latest news";

    const response = await axios.get(BASE_URL, {
        params: {
            q: query,
            token: process.env.NEWS_API_KEY,
            lang: "en",
            max: 10,
        },
    });

    return response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.image,
        source: article.source?.name,
        publishedAt: article.publishedAt,
    }));
}

module.exports = { fetchNews };