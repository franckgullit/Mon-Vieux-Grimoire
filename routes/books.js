const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const optimizeImage = require('../middleware/sharp-config.js')
const router = express.Router();

const bookCtrl = require('../controllers/Books-Ctrl');

router.get('/', bookCtrl.getAllBooks);
router.post('/', auth, multer, optimizeImage, bookCtrl.createBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);
router.get('/bestrating', bookCtrl.bestRating);
router.get('/:id',bookCtrl.getOneBook);
router.put('/:id', auth, multer, optimizeImage, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;