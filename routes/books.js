const express = require('express');
const router = express.Router();

const Book = require('../models/Books');

router.post('/Books', (req, res, next) => {
    delete req.body._id;
    const book = new Book({
                    title: 'req.body.title',
                    Author: 'req.body.Author',
                    imageUrl: 'req.body.Image',
                    Genre: 'req.body.type',
                    Year: 'req.body.Year',
                    userId: 'Signed in User',
                    Rating: 'Book Rating',    
        });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre Ajouteé avec succes !' }))
        .catch(error => res.status(400).json({ error }));
});

router.get('/:id', (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
});

router.get('/Books', (req, res, next) => {
    Book.find()
        .then(book => res.status(200).json(book))
        .catch(error => res.status(400).json({ error }));
});

router.put('/:id', (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre Modifie !' }))
        .catch(error => res.status(400).json({ error }));
});

router.delete('/:id', (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'livre Supprimee !' }))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;