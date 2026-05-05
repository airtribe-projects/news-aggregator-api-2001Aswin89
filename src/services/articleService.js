const { readArticles, writeArticles } = require("../models/articleModel");
const { randomUUID } = require("crypto");

async function saveArticle(userId, article) {
    const data = await readArticles();

    const exists = data.find(
        a => a.userId === userId && a.url === article.url
    );

    if (exists) {
        throw new Error("Article already saved");
    }

    const newArticle = {
        id: randomUUID(),
        userId,
        ...article,
        createdAt: new Date().toISOString(),
    };

    data.push(newArticle);
    await writeArticles(data);

    return newArticle;
}

async function getUserArticles(userId) {
    const data = await readArticles();
    return data.filter(a => a.userId === userId);
}

async function deleteArticle(userId, articleId) {
    const data = await readArticles();

    const index = data.findIndex(
        a => a.id === articleId && a.userId === userId
    );

    if (index === -1) {
        throw new Error("Article not found");
    }

    const deleted = data.splice(index, 1);
    await writeArticles(data);

    return deleted[0];
}

module.exports = {
    saveArticle,
    getUserArticles,
    deleteArticle,
};
