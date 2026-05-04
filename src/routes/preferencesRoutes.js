const express = require("express");
const {
    getPreferences,
    upsertPreferences,
} = require("../controllers/preferencesController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getPreferences);
router.post("/", authMiddleware, upsertPreferences);
router.patch("/", authMiddleware, upsertPreferences);

module.exports = router;