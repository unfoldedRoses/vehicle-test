require('dotenv').config(); 

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors'); // Enable Cross-Origin Resource Sharing (CORS)

const db = require('./models/index.js'); // Import your Sequelize models (correct path!)

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (example)
app.get('/', (req, res) => {
  res.send('Hello, Vehicle Rental App!');
});


// Sync the database and start the server
db.sequelize.sync()
  .then(() => {
    console.log('Database synced!'); // Confirmation message
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Error handling middleware (example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;