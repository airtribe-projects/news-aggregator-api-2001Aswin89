const express = require("express");
const {
    getPreferences,
    upsertPreferences,
} = require("../controllers/preferencesController");
const authMiddleware = require("../middleware/authMiddleware");
const { validatePreferences } = require("../middleware/validate");
const router = express.Router();

router.get("/", authMiddleware, getPreferences);
// router.post("/", authMiddleware, validatePreferences, upsertPreferences);
// router.patch("/", authMiddleware, validatePreferences, upsertPreferences);
router.put("/", authMiddleware, validatePreferences, upsertPreferences);

module.exports = router;