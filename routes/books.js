const express = require('express');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');
const router = express.Router();

const bookCtrl = require('../controllers/Books-Ctrl.js');

router.get('/',bookCtrl.getAllBooks);
router.post('/', auth, multer, bookCtrl.createBook);
router.get('/:id',bookCtrl.getOneBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);


module.exports = router;