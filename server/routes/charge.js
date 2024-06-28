'use strict';

const express = require('express');
const router = express.Router();
const config = require('../config'); // Corrected path to config
const stripe = require('stripe')(config.stripe.secretKey);

// Route to simulate a charge
router.post('/', async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: 1000, // $10.00 for the charge
      currency: 'usd',
      source: 'tok_visa', // obtained with Stripe.js or from testing card
      description: 'Test Charge',
    });
    res.status(200).send(charge);
  } catch (err) {
    console.log('Error creating charge:', err);
    res.status(500).send({ error: 'Charge creation failed' });
  }
});

module.exports = router;

