const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const shortid = require('shortid');

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: 'Please provide a URL' });
  }

  const shortCode = shortid.generate();

  try {
    let url = new Url({ originalUrl, shortCode });
    await url.save();
    res.json({ shortUrl: `${req.headers.host}/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (!url) return res.status(404).json({ message: 'Not found' });

    url.clicks++;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
