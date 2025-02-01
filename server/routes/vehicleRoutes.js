const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.get('/types', vehicleController.getVehicleTypes);
router.get('/', vehicleController.getVehiclesByType);
router.get('/models', vehicleController.getVehicleModels); // Add this route for models
router.get('/:id/availability', vehicleController.checkAvailability); 


module.exports = router;