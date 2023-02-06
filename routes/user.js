
const express = require('express');
const validator = require('../validation/validator');
const router = express.Router();
const validateToken = require('../middleware/Auth');

const userController = require('../controller/userController');

router.post('/login', userController.login);
router.get('/:userid', userController.getOneUser);
router.post('/',validator.userValidator() ,userController.createUser);
router.put('/:userid',validator.userValidator(), validateToken, userController.updateUser);
router.delete('/:userid',validateToken, userController.deleteUser);

module.exports = router