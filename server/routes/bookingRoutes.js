// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/create', bookingController.createBooking); // Single API endpoint for booking
router.get('/test', bookingController.testRoute);
module.exports = router;