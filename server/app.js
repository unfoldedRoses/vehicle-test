require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const rateLimit = require('express-rate-limit'); 

const db = require('./models/index.js');

const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Rate Limiter Configuration (Important!)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.", // Customize error message
  // You can add more options like:
  //  - statusCode: 429, // Set the HTTP status code for rate-limited requests
  //  - skip: (req) => { /* Optional: Skip rate limiting for certain requests */  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply Rate Limiter (Globally or per route)
app.use('/api/v1/', limiter); // Apply to all /api/v1 routes.  You can apply it to individual routes instead if you want more granular control.


// Mount Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/vehicle', vehicleRoutes);
app.use('/api/v1/booking', bookingRoutes);


// Root Route
app.get('/', (req, res) => {
  res.send('Hello, Vehicle Rental App!');
});

// Start Server and Database Sync
async function startApp() {
  try {
    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ force: false });
      console.log('Database synced (development only)!');
    }

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startApp();

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;