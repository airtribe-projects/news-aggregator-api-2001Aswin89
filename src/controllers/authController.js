const authService = require("../services/authService");
const prefService = require("../services/preferencesService");


async function register(req, res, next) {
    try {
        const { name, email, password, preferences } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const result = await authService.registerUser({
            name,
            email,
            password
        });

        if (preferences) {
            try {
                await prefService.createOrUpdatePreferences(result.user.id, {
                    preferences
                });
            } catch (e) {
                console.error("Preferences save failed:", e.message);
            }
        }

        return res.status(200).json({
            token: result.token
        });

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser({ email, password });

        res.status(200).json({
            token: result.token
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

module.exports = {
    register,
    login,
};
