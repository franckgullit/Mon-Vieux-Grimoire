const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/Books-Ctrl');

router.post('/', bookCtrl.createBook);
router.delete('/:id', bookCtrl.deleteBook);
router.put('/:id', bookCtrl.modifyBook);
router.get('/:id', bookCtrl.getOneBook);
router.get('/Books',bookCtrl.getAllBooks);

module.exports = router;