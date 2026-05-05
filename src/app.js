require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const preferencesRoutes = require("./routes/preferencesRoutes");
const newsRoutes = require("./routes/newsRoutes");
const articleRoutes = require("./routes/articleRoutes");
const errorHandler = require("./middleware/errorHandler");


const app = express();

app.use(express.json());

app.use("/users", authRoutes);
app.use("/users/preferences", preferencesRoutes);
app.use("/news", newsRoutes);
app.use("/articles", articleRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});

// health check
app.get("/health", (req, res) => {
    res.json({ message: "Server running" });
});

app.use(errorHandler);



module.exports = app;
