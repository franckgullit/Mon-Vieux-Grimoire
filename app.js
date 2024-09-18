const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const mongoConnectionConfig = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_OPTIONS}`;

mongoose.connect(mongoConnectionConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('MongoDB - connection Success !'))
    .catch(() => console.log('Connexion - connection Failed !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors());

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;