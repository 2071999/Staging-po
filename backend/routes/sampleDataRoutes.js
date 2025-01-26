const express = require('express');
const SampleData = require('../models/SampleData');
const router = express.Router(); 



router.get('/sampledata', async (req, res) => {
    try {
      const data = await SampleData.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch sample data' });
    }
  });


  router.get('/sampledata/search', async (req, res) => {
    try {
      const { product } = req.query; 
      const searchQuery = {};
  
      if (product) {
      
        searchQuery.PRODUCT = { $regex: product, $options: 'i' };
      }
  
      const data = await SampleData.find(searchQuery);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Failed to search sample data' });
    }
  });

module.exports = router;