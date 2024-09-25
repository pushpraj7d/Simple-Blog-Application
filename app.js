const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend'))); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

const BlogPost = mongoose.model('BlogPost', new mongoose.Schema({
    title: String,
    content: String,
}));

app.get('/blogs', async (req, res) => {
    const blogs = await BlogPost.find();
    res.json(blogs);
});

app.post('/blogs', async (req, res) => {
    const { title, content } = req.body;
    const newPost = new BlogPost({ title, content });
    await newPost.save();
    res.json(newPost);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
