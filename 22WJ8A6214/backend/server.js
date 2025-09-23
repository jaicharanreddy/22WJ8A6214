const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Product model
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
}));

// Cart model
const CartItem = mongoose.model('CartItem', new mongoose.Schema({
  productId: mongoose.Types.ObjectId,
  quantity: Number,
}));

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/api/cart', async (req, res) => {
  const cart = await CartItem.find();
  res.json(cart);
});

app.post('/api/cart', async (req, res) => {
  const { productId, quantity } = req.body;
  let item = await CartItem.findOne({ productId });
  if (item) {
    item.quantity += quantity;
    await item.save();
  } else {
    item = new CartItem({ productId, quantity });
    await item.save();
  }
  res.json(item);
});

mongoose.connect('mongodb://mongo:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Backend running on port 5000')));