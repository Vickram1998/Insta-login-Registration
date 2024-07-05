const express = require('express');
const UserFeed = require('../models/Feed');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const users = await UserFeed.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, dp, location, PostImage, description } = req.body;
  const user = new UserFeed({
    name,
    dp,
    location,
    PostImage,
    description,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
