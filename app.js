const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const bodyparser = require('body-Parser');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/books');

const app = express();

const mongoConnectionConfig = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_OPTIONS}`;

mongoose.connect(mongoConnectionConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('MongoDB - connection Success !'))
    .catch(() => console.log('Connexion - connection Failed !'));

app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyparser());

app.use('/api/Books', bookRoutes);

module.exports = app;