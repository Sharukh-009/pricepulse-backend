const mongoose = require('mongoose');

const trackItemSchema = new mongoose.Schema({
  url: String,
  email: String,
  budget: Number,
  notified: {
    type: Boolean,
    default: false // ✅ Initially false
  }
});

module.exports = mongoose.model('TrackItem', trackItemSchema);
