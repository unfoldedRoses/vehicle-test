// const express = require('express');
// const router = express.Router();
// const vehicleController = require('../controllers/vehicleController');

// router.get('/types', vehicleController.getVehicleTypes);
// router.get('/', vehicleController.getVehiclesByType);
// router.get('/models', vehicleController.getVehicleModels); // Add this route for models
// router.get('/:id/availability', vehicleController.checkAvailability); 


// module.exports = router;

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle Booking API',
      version: '1.0.0',
      description: 'API for booking vehicles',
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Adjust if needed.  Most important part!
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);


/**
 * @swagger
 * /types:
 *   get:
 *     summary: Get vehicle types by number of wheels
 *     parameters:
 *       - in: query
 *         name: wheels
 *         schema:
 *           type: integer
 *         description: Number of wheels (2 or 4)
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   type_name:
 *                     type: string
 */
router.get('/types', vehicleController.getVehicleTypes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get vehicles by type
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: integer
 *         description: ID of the vehicle type
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   available:
 *                     type: boolean
 *                   type_id:
 *                     type: integer
 *                   model_id:
 *                     type: integer
 *                   vehicleModel:
 *                     type: object
 *                     properties:
 *                       model_name:
 *                         type: string
 *                   vehicleType:
 *                     type: object
 *                     properties:
 *                       type_name:
 *                         type: string
 */
router.get('/', vehicleController.getVehiclesByType);

/**
 * @swagger
 * /models:
 *   get:
 *     summary: Get vehicle models
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: integer
 *         description: ID of the vehicle type
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   model_name:
 *                     type: string
 */
router.get('/models', vehicleController.getVehicleModels);

/**
 * @swagger
 * /{id}/availability:
 *   get:
 *     summary: Check vehicle availability
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the vehicle
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *       400:
 *         description: Bad request (e.g., invalid date range)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id/availability', vehicleController.checkAvailability);


router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;