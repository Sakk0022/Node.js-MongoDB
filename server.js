const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/blog-api', {
   
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Database connection error:', err));

app.use(express.json());

app.use(express.static('public'));

const blogRoutes = require('./routes/blogs');
app.use('/blogs', blogRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
