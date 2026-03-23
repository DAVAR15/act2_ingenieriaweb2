const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

router.post('/', directorController.addDirector);
router.get('/', directorController.retrieveAllDirectors);
router.put('/:id', directorController.modifyDirector);

module.exports = router;
