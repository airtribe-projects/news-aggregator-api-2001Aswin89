const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "../../data/userArticles.json");

async function readUserArticles() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

async function writeUserArticles(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
    readUserArticles,
    writeUserArticles,
};
