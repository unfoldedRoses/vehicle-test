// const db = require('../models');
// const { Op } = require('sequelize');
// const dayjs = require('dayjs');

// const vehicleController = {
//   async getVehicleTypes(req, res) {
//     try {
//       const vehicleTypes = await db.VehicleType.findAll();
//       res.json(vehicleTypes);
//     } catch (error) {
//       console.error("Error fetching vehicle types:", error);
//       res.status(500).json({ error: 'Failed to fetch vehicle types' });
//     }
//   },

//   async getVehiclesByType(req, res) {
//     const { type } = req.query;
//     try {
//         let whereClause = {};
//         if (type) {
//             const typeId = parseInt(type, 10);
//             if (isNaN(typeId)) {
//                 return res.status(400).json({ error: 'Invalid type parameter. Must be an integer.' });
//             }
//             whereClause = { type_id: typeId };
//         }

//         const vehicles = await db.Vehicle.findAll({
//             where: whereClause,
//             include: [
//                 { model: db.VehicleModel, as: 'vehicleModel', attributes: ['model_name'] },
//                 { model: db.VehicleType, as: 'vehicleType', attributes: ['type_name'] }
//             ]
//         });

//         if (vehicles.length === 0) {
//             return res.status(204).end(); 
//         }

//         res.json(vehicles);
//     } catch (error) {
//         console.error("Error fetching vehicles:", error);
//         res.status(500).json({ error: 'Failed to fetch vehicles', details: error.message }); 
//     }
// },

// async getVehicleModels(req, res) {
//   console.log("getVehicleModels called");
//     console.log("req.query.type:", req.query); // Check the value
//   const { type } = req.query; // Get 'type' from query

//   try {
//       let whereClause = {};
//       if (type) {
//           const typeId = parseInt(type, 10);
//           if (isNaN(typeId)) {
//               return res.status(400).json({ error: 'Invalid type parameter. Must be an integer.' });
//           }
//           whereClause = { type_id: typeId };
//       }

//       const vehicleModels = await db.VehicleModel.findAll({
//           where: whereClause,
//           attributes: ['model_name'] // Fetch only model_name
//       });
//       res.json(vehicleModels);

//   } catch (error) {
//       console.error("Error fetching vehicle models:", error);
//       res.status(500).json({ error: 'Failed to fetch vehicle models', details: error.message });
//   }
// },

// async checkAvailability(req, res) {
//   const { id } = req.params; // Vehicle ID
//   const { start_date, end_date } = req.query; // Start and end dates

//   try {
//       // 1. Validate Inputs
//       if (!start_date || !end_date || !id) {
//           return res.status(400).json({ error: "Missing required parameters (id, start_date, end_date)." });
//       }

//       const startDate = dayjs(start_date);
//       const endDate = dayjs(end_date);

//       if (!startDate.isValid() || !endDate.isValid()) {
//           return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
//       }

//       if (startDate.isAfter(endDate)) {
//           return res.status(400).json({ error: "Start date must be before end date." });
//       }

//       // 2. Check if the vehicle exists
//       const vehicle = await db.Vehicle.findByPk(id);
//       if (!vehicle) {
//           return res.status(404).json({ error: "Vehicle not found." });
//       }

//       // 3. Check for existing bookings within the date range
//       const existingBookings = await db.Booking.findAll({
//           where: {
//               vehicle_id: id,
//               [Op.or]: [ // Check if the new booking overlaps with existing ones
//                   {
//                       start_date: { [Op.lte]: endDate.format('YYYY-MM-DD') }, // Existing booking starts before or on the requested end date
//                       end_date: { [Op.gte]: startDate.format('YYYY-MM-DD') },   // Existing booking ends after or on the requested start date
//                   },
//               ],
//           },
//       });


//       const isAvailable = existingBookings.length === 0; // If no overlapping bookings, then available

//       res.json({ available: isAvailable });

//   } catch (error) {
//       console.error("Error checking availability:", error);
//       res.status(500).json({ error: "Failed to check availability", details: error.message });
//   }
// },


// }

// module.exports = vehicleController;

const db = require('../models');
const { Op } = require('sequelize');
const dayjs = require('dayjs');

const vehicleController = {
    async getVehicleTypes(req, res) {
        const { wheels } = req.query; // Get wheels from query parameters

        try {
            let whereClause = {};
            if (wheels) {
                whereClause = { wheels: wheels }; // Filter by wheels if provided
            }

            const vehicleTypes = await db.VehicleType.findAll({
                where: whereClause, // Apply the where clause
                attributes: ['id', 'type_name'] // Include id
            });

            console.log(vehicleTypes,">")

            res.json(vehicleTypes);
        } catch (error) {
            console.error("Error fetching vehicle types:", error);
            res.status(500).json({ error: 'Failed to fetch vehicle types' });
        }
    },

    async getVehiclesByType(req, res) {
        const { type } = req.query;
        try {
            let whereClause = {};
            if (type) {
                const typeId = parseInt(type, 10);
                if (isNaN(typeId)) {
                    return res.status(400).json({ error: 'Invalid type parameter. Must be an integer.' });
                }
                whereClause = { type_id: typeId };
            }

            const vehicles = await db.Vehicle.findAll({
                where: whereClause,
                include: [
                    { model: db.VehicleModel, as: 'vehicleModel', attributes: ['model_name'] },
                    { model: db.VehicleType, as: 'vehicleType', attributes: ['type_name'] }
                ]
            });

            if (vehicles.length === 0) {
                return res.status(204).end();
            }

            res.json(vehicles);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
            res.status(500).json({ error: 'Failed to fetch vehicles', details: error.message });
        }
    },

    async getVehicleModels(req, res) {
        const { type } = req.query;
        try {
            let whereClause = {};
            if (type) {
                const typeId = parseInt(type, 10);
                if (isNaN(typeId)) {
                    return res.status(400).json({ error: 'Invalid type parameter. Must be an integer.' });
                }
                whereClause = { type_id: typeId };
            }

            const vehicleModels = await db.VehicleModel.findAll({
                where: whereClause,
                attributes: ['model_name','type_id']
            });
            res.json(vehicleModels);

        } catch (error) {
            console.error("Error fetching vehicle models:", error);
            res.status(500).json({ error: 'Failed to fetch vehicle models', details: error.message });
        }
    },

    async checkAvailability(req, res) {
        const { id } = req.params;
        const { start_date, end_date } = req.query;

        try {
            // ... (input validation remains the same)

            const vehicle = await db.Vehicle.findByPk(id);
            if (!vehicle) {
                return res.status(404).json({ error: "Vehicle not found." });
            }

            const existingBookings = await db.Booking.findAll({
                where: {
                    vehicle_id: id,
                    [Op.or]: [
                        {
                            start_date: { [Op.lte]: endDate.format('YYYY-MM-DD') },
                            end_date: { [Op.gte]: startDate.format('YYYY-MM-DD') },
                        },
                    ],
                },
            });

            const isAvailable = existingBookings.length === 0;

            res.json({ available: isAvailable });

        } catch (error) {
            console.error("Error checking availability:", error);
            res.status(500).json({ error: "Failed to check availability", details: error.message });
        }
    },
};

module.exports = vehicleController;