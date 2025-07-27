require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { trackSession } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(trackSession); // Logs page views & sessions

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Health check route
const { healthCheck } = require('./db');
app.get('/health', async (req, res) => {
  const status = await healthCheck();
  res.json(status);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
  