
const express = require('express');
const validator = require('../validation/validator');
const router = express.Router();
const validateToken = require('../middleware/Auth');

const userController = require('../controller/userController');

router.post('/login', userController.login);
router.get('/',validateToken, userController.getOneUser);
router.post('/', validator.userValidator(),validateToken ,userController.createUser);
router.put('/', validator.userValidator(), validateToken, userController.updateUser);
router.delete('/',validateToken, userController.deleteUser);

module.exports = router