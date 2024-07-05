const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dp: { type: String, required: true },
  location: { type: String, required: true },
  PostImage: { type: String, required: true },
  likes: { type: Number, default: 0 },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const UserFeed = mongoose.model('UserFeed', feedSchema);
module.exports = UserFeed;
