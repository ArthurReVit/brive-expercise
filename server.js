const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database

connectDB();

// Init middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send(`[ i ] API RUNNING`));

// Define routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/workers', require('./routes/api/workers'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`[ i ] SERVER STARTED ON PORT  ${PORT}`));
