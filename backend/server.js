// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes    = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',    authRoutes);
app.use('/api/requests', requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
