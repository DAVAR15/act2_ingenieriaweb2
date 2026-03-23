const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

router.post('/', typeController.addType);
router.get('/', typeController.retrieveAllTypes);
router.put('/:id', typeController.modifyType);

module.exports = router;
