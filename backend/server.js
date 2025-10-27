const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ DB Error:', err));

// LOGIN endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PRODUCTS endpoint
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ORDERS endpoint
app.post('/api/orders', async (req, res) => {
  const { username, products } = req.body;
  const order = new Order({ username, products });
  await order.save();
  res.json({ success: true });
});

app.get('/api/orders/:username', async (req, res) => {
  const orders = await Order.find({ username: req.params.username });
  res.json(orders);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
