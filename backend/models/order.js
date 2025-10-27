const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: String,
  products: Array
});

module.exports = mongoose.model('Order', schema);
