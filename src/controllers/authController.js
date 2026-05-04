const authService = require("../services/authService");

async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        const result = await authService.registerUser({ name, email, password });

        res.status(201).json({
            message: "User registered successfully",
            ...result,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser({ email, password });

        res.json({
            message: "Login successful",
            ...result,
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

module.exports = {
    register,
    login,
};