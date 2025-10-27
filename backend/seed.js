const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');

async function seed() {
  try {
    await mongoose.connect('mongodb://localhost:27017/electronicsales');
    console.log("✅ MongoDB connected");

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert sample products with LOCAL paths
    await Product.insertMany([
      { name: 'Wireless Headphone', price: 149.99, image: 'images/headphone.jpg' },
      { name: 'Smartwatch', price: 199.99, image: 'images/smartwatch.jpg' },
      { name: 'Bluetooth Speaker', price: 74.99, image: 'images/speaker.jpg' },
      { name: 'Wireless Mouse', price: 19.99, image: 'images/mouse.jpg' },
      { name: '4K Monitor', price: 299.99, image: 'images/monitor.jpg' },
      { name: 'Laptop', price: 999.99, image: 'images/laptop.jpg' }
    ]);

    // Create a test user
    await User.create({ username: 'test', password: '1234' });

    console.log("🌱 Sample data inserted successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  }
}

seed();
