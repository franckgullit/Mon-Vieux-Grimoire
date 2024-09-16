const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://mon_vieux_grimoire:liverpoolarmy@cluster-monvieuxgrimoir.cxng0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-MonVieuxGrimoire',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    .then(() => console.log('MongoDB - connection Success !'))
    .catch(() => console.log('Connexion - connection Failed !'));


app.use((req, res, next) => {
    res.json({ message: 'working once again?' });
});

module.exports = app;