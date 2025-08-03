const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const trackRoute = require('./routes/track');
const checkPrices = require('./scraper');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(console.error);

app.use('/api/track', trackRoute);

// 🔥 Manual trigger for testing scraper
app.get('/test/scrape', async (req, res) => {
  console.log("📩 /test/scrape route hit");
  await checkPrices();
  res.send("🧪 Manual price check triggered.");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
