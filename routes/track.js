const express = require('express');
const router = express.Router();
const TrackItem = require('../models/TrackItem');
const checkPrices = require('../scraper');  // ✅ Import the function here

router.post('/', async (req, res) => {
    const { url, email, budget } = req.body;

    if (!url || !email || !budget) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const newItem = new TrackItem({ url, email, budget });
        await newItem.save();

        // ✅ Call checkPrices() immediately after saving
        await checkPrices();

        res.json({ message: '✅ Tracking started successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
