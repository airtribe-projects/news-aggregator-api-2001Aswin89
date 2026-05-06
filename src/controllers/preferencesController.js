const service = require("../services/preferencesService");

async function getPreferences(req, res, next) {
    try {
        const userId = req.user.id;

        const prefs = await service.getPreferences(userId);

        res.status(200).json({
            preferences: prefs?.preferences || []
        });
    } catch (err) {
        next(err);
    }
}

async function upsertPreferences(req, res, next) {
    try {
        const userId = req.user.id;

        const prefs = await service.createOrUpdatePreferences(userId, req.body);

        res.status(200).json({
            preferences: req.body.preferences
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getPreferences,
    upsertPreferences,
};
