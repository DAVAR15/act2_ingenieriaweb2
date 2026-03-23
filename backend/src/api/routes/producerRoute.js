const express = require('express');
const router = express.Router();
const producerController = require('../controllers/producerController');

router.post('/', producerController.addProducer);
router.get('/', producerController.retrieveAllProducers);
router.put('/:id', producerController.modifyProducer);

module.exports = router;
