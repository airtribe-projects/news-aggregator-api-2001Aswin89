const service = require("../services/preferencesService");

async function getPreferences(req, res) {
    try {
        const userId = req.user.id;

        const prefs = await service.getPreferences(userId);

        res.json({
            message: "Preferences fetched",
            preferences: prefs,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function upsertPreferences(req, res) {
    try {
        const userId = req.user.id;

        const prefs = await service.createOrUpdatePreferences(userId, req.body);

        res.json({
            message: "Preferences saved",
            preferences: prefs,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getPreferences,
    upsertPreferences,
};