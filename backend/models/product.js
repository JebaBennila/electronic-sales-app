const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String // URL or local path
});

module.exports = mongoose.model('Product', productSchema);
