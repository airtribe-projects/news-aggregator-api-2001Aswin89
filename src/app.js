require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const preferencesRoutes = require("./routes/preferencesRoutes");
const newsRoutes = require("./routes/newsRoutes");
const articleRoutes = require("./routes/articleRoutes");
const errorHandler = require("./middleware/errorHandler");


const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/preferences", preferencesRoutes);
app.use("/news", newsRoutes);
app.use("/articles", articleRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});

app.use(errorHandler);
// health check
app.get("/health", (req, res) => {
    res.json({ message: "Server running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});