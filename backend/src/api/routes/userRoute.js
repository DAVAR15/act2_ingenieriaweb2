const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.addUser);
router.get('/', userController.retrieveAllUsers);
router.put('/:id', userController.modifyUser);
router.patch('/:id/deactivate', userController.disableUser);

module.exports = router;
