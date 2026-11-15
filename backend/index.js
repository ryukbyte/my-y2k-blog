
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.cert(serviceAccount)
});

// Verify Firebase login token
async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Firebase token verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid or expired login token' });
  }
}

// Check whether the user is the administrator
function requireAdmin(req, res, next) {
  if (req.user.email !== 'vidula.saravanan@gmail.com') {
    return res.status(403).json({ message: 'Admin access denied' });
  }

  next();
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/blogDB')
  .then(() => {
    console.log('Connection Successful');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define Schema
const blogSchema = new mongoose.Schema({
  newTitle: String,
  newContent: String,
  date: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

// Get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like a blog
app.patch('/api/blogs/like/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a blog (Admin only)
app.post('/api/blogs', verifyFirebaseToken, requireAdmin, async (req, res) => {
  const blog = new Blog({
    newTitle: req.body.newTitle,
    newContent: req.body.newContent,
    date: req.body.date,
    likes: req.body.likes
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit a blog (Admin only)
app.put('/api/blogs/:id', verifyFirebaseToken, requireAdmin, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        newTitle: req.body.newTitle,
        newContent: req.body.newContent
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog (Admin only)
app.delete('/api/blogs/:id', verifyFirebaseToken, requireAdmin, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
app.listen(5001, () => {
  console.log('Server running on port 5001');
});
