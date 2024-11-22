import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all artists
router.get('/', async (req, res) => {
  try {
    const artists = await User.find().select('-password');
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get artist by ID
router.get('/:id', async (req, res) => {
  try {
    const artist = await User.findById(req.params.id).select('-password');
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update artist profile (protected route)
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, artMedium, bio, profileImage } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (name) user.name = name;
    if (artMedium) user.artMedium = artMedium;
    if (bio) user.bio = bio;
    if (profileImage) user.profileImage = profileImage;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;