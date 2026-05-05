const {
    readPreferences,
    writePreferences,
} = require("../models/preferencesModel");

async function getPreferences(userId) {
    const data = await readPreferences();

    const prefs = data.find(p => p.userId === userId);

    if (!prefs) return null;

    return {
        preferences: prefs.categories || []
    };
}

async function createOrUpdatePreferences(userId, body) {
    const categories = body.preferences || body.categories || [];
    const keywords = body.keywords || [];

    const data = await readPreferences();

    const index = data.findIndex(p => p.userId === userId);

    if (index !== -1) {
        data[index] = {
            ...data[index],
            categories,
            keywords,
            updatedAt: new Date().toISOString(),
        };
    } else {
        data.push({
            userId,
            categories,
            keywords,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    }

    await writePreferences(data);

    return data.find(p => p.userId === userId);
}

module.exports = {
    getPreferences,
    createOrUpdatePreferences,
};
