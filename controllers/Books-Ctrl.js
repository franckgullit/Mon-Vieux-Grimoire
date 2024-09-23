const Book = require('../models/Books')
const fs = require('fs');
const path = require('path');

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    delete bookObject.averageRating;

    bookObject.ratings = [];

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    book.save()
        .then(() => res.status(201).json({ message: 'Livre Ajouteé avec success !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.rateBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id }).then((book) => {
        let grade = req.body.rating;

        grade = grade < 0 ? 0 : grade;
        grade = grade > 5 ? 5 : grade;

        if (book.ratings.find((rating) => rating.userId === req.auth.userId) !== undefined) {
            return res.status(403).json({ message: "unauthorized request" })
        }

        book.ratings.push({ grade: grade, userId: req.auth.userId });

        const sumTotal = book.ratings.reduce((acc, rating) => acc + rating.grade, 0);
        book.averageRating = Math.round(sumTotal / book.ratings.length);

        book.save()
            .then(updatedBook => res.status(200).json(updatedBook))
            .catch(error => res.status(400).json({ error }));

    }).catch(error => res.status(404).json({ error }));

};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'User Not Authorized' });
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Livre Supprimé!' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'User Not Authorized' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: 'Livre modifié' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.bestRating = (req, res, next) => {
    Book.find().sort('-averageRating').limit(3)
        .then(livres => res.status(200).json(livres))
        .catch(error => res.status(500).json({ error }));
};


