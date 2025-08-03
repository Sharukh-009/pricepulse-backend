const axios = require('axios');
const cheerio = require('cheerio');
const TrackItem = require('./models/TrackItem');
const sendNotification = require('./mailer');

const getPriceFromAmazon = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const $ = cheerio.load(data);
    const priceWhole = $('.a-price-whole').first().text().replace(/[^\d]/g, '');
    const symbol = $('.a-price-symbol').first().text().trim();
    const price = parseInt(priceWhole);

    return price || null;
  } catch (err) {
    console.error(`❌ Failed to fetch ${url}`, err.message);
    return null;
  }
};

const checkPrices = async () => {
  console.log('🚀 checkPrices() started');
  
  const items = await TrackItem.find({ notified: false });

  for (let item of items) {
    console.log(`🟡 Checking ${item.url} for ${item.email}`);

    const currentPrice = await getPriceFromAmazon(item.url);
    console.log(`🔍 Fetched price: ₹${currentPrice} | Budget: ₹${item.budget}`);

    if (currentPrice && currentPrice <= item.budget) {
      console.log(`✅ Price dropped! Sending email to ${item.email}...`);
      try {
        await sendNotification(item.email, item.url, currentPrice);
        item.notified = true; // ✅ Stop future notifications
      } catch (e) {
        console.error(`📧 Email failed for ${item.email}:`, e.message);
      }
    } else {
      console.log(`❌ No price drop. Skipping email.`);
    }

    item.lastPrice = currentPrice || item.lastPrice;
    await item.save(); // ✅ Always persist changes (price + notified)
  }
};

module.exports = checkPrices;
