const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const locationRoutes = require('./routes/locationRoutes');
const connectDB = require('./config/db'); // Import funkcji łączenia z MongoDB

const app = express();
const port = 5001;

// Połącz z MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', eventRoutes);
app.use('/api', locationRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
