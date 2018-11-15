const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});
