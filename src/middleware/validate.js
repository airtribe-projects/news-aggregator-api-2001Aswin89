function validatePreferences(req, res, next) {
    const { categories, keywords } = req.body;

    if (categories && !Array.isArray(categories)) {
        return res.status(400).json({
            message: "categories must be an array",
        });
    }

    if (keywords && !Array.isArray(keywords)) {
        return res.status(400).json({
            message: "keywords must be an array",
        });
    }

    next();
}

module.exports = {
    validatePreferences,
};