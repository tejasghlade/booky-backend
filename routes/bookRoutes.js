

const exporess = require('express')

const bookController = require('../controllers/bookController');

const router = exporess.Router();

router.get('/',bookController.getBooks);
router.get('/:id', bookController.getBookById);

module.exports = router;