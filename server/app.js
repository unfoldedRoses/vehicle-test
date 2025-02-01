require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment port or 3000
const cors = require('cors'); // Enable Cross-Origin Resource Sharing (CORS)

const db = require('./models/index.js'); // Import your Sequelize models

const userRoutes = require('./routes/userRoutes');       // Import user routes
const vehicleRoutes = require('./routes/vehicleRoutes');       // Import user routes



// Middleware
app.use(cors()); // Enable CORS for all origins (or configure as needed)
app.use(express.json()); // Enable parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // Enable parsing URL-encoded request bodies


// Mount Routes
app.use('/api/users', userRoutes);
app.use('/api/vehicle', vehicleRoutes);




// Root Route (optional)
app.get('/', (req, res) => {
  res.send('Hello, Vehicle Rental App!');
});


// Start Server and Database Sync (Conditional for Development)
async function startApp() {  // Async function for cleaner code
  try {
    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ force: false }); // Sync in dev, force: false!
      console.log('Database synced (development only)!');
    } else {
      console.log('something went wrong!');
    }

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startApp(); // Call the async function to start the app

// Error Handling Middleware (Important!)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).send('Something went wrong!'); // Generic error message to the client
});

module.exports = app; 