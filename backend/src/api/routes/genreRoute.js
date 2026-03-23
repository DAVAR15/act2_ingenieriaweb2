const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.post('/', genreController.addGenre);
router.get('/', genreController.retrieveAllGenres);
router.put('/:id', genreController.modifyGenre);

module.exports = router;
