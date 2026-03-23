const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

router.post('/', mediaController.addMedia);
router.get('/', mediaController.retrieveAllMedia);
router.put('/:id', mediaController.modifyMedia);

module.exports = router;
