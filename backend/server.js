const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/productdb');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Mongoose Models
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  role: String, // "admin" or "user"
}));

const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String
}));

// Routes
app.post('/api/register', async (req, res) => {
  const user = await User.create(req.body);
  res.send(user);
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne(req.body);
  user ? res.send(user) : res.status(401).send({ message: 'Invalid' });
});

app.post('/api/products', upload.single('image'), async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file?.filename;
  const product = await Product.create({ name, price, description, image });
  res.send(product);
});

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.delete('/api/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send({ success: true });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
