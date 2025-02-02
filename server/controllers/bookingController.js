// controllers/bookingController.js
const db = require('../models');
const { Op } = require('sequelize');
const dayjs = require('dayjs');

const bookingController = {
    async createBooking(req, res) {
        const {
            first_name,
            last_name,
            wheels,
            vehicleType,
            specificModel,
            startDate,
            endDate,
        } = req.body;

        try {
            // 1. Input Validation
            if (!first_name || !last_name || !wheels || !vehicleType || !specificModel || !startDate || !endDate) {
                return res.status(400).json({ error: "Missing required fields." });
            }

            const startDateObj = dayjs(startDate);
            const endDateObj = dayjs(endDate);

            if (!startDateObj.isValid() || !endDateObj.isValid()) {
                return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
            }

            if (startDateObj.isAfter(endDateObj)) {
                return res.status(400).json({ error: "Start date must be before end date." });
            }

            // 2. Get Vehicle ID (from specificModel name - CASE-INSENSITIVE)
            const vehicle = await db.Vehicle.findOne({
                include: [{
                    model: db.VehicleModel,
                    as: 'vehicleModel',
                    where: { model_name: { [Op.iLike]: specificModel } } // Case-insensitive query
                }]
            });

            if (!vehicle || !vehicle.vehicleModel) {
                return res.status(404).json({ error: "Vehicle not found." });
            }
            const vehicleId = vehicle.id;

            // 3. Check for Overlapping Bookings
            const existingBookings = await db.Booking.findAll({
                where: {
                    vehicle_id: vehicleId,
                    [Op.or]: [
                        {
                            start_date: { [Op.lte]: endDate },
                            end_date: { [Op.gte]: startDate },
                        },
                    ],
                },
            });

            if (existingBookings.length > 0) {
                return res.status(400).json({ error: "Vehicle is not available for the selected dates." });
            }

            // 4. Create User (or fetch if exists)
            let user = await db.User.findOne({ where: { first_name, last_name } });
            if (!user) {
                user = await db.User.create({ first_name, last_name });
            }

            // 5. Create Booking
            const booking = await db.Booking.create({
                user_id: user.id,
                vehicle_id: vehicleId,
                start_date: startDate,
                end_date: endDate,
            });

            res.status(201).json({ message: "Booking created successfully", booking });

        } catch (error) {
            console.error("Error creating booking:", error);
            res.status(500).json({ error: "Failed to create booking", details: error.message }); // Send error details
        }
    },

    async testRoute(req, res) {  // New test route handler
        try {
            res.status(200).json({ message: "This is a test route. It's working!" });
        } catch (error) {
            console.error("Error in test route:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = bookingController;