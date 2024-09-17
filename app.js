const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const mongoConnectionConfig=`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_OPTIONS}`;

 mongoose.connect(mongoConnectionConfig,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    .then(() => console.log('MongoDB - connection Success !'))
    .catch(() => console.log('Connexion - connection Failed !'));


app.use((req, res, next) => {
    res.json({ message: 'working once again?' });
});

module.exports = app;