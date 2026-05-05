const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "../data/articles.json");

async function readArticles() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

async function writeArticles(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
    readArticles,
    writeArticles,
};