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
           //do input validations 
            const startDate = dayjs(start_date);
            const endDate = dayjs(end_date);
            if (!startDate.isValid() ||!endDate.isValid()) {
                return res.status(400).json({ error: "Invalid start or end date." });
            }
            if (startDate.isAfter(endDate)) {
                return res.status(400).json({ error: "Start date must be before end date." });
            }
            if (!id) {
                return res.status(400).json({ error: "Missing vehicle ID." });
            }

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