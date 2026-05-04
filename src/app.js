require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const preferencesRoutes = require("./routes/preferencesRoutes");
const newsRoutes = require("./routes/newsRoutes");


const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/preferences", preferencesRoutes);
app.use("/news", newsRoutes);

// health check
app.get("/health", (req, res) => {
    res.json({ message: "Server running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});