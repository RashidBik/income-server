
const express = require('express');
const validator = require('../validation/validator');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/:userid', userController.getOneUser);
router.post('/',validator.userValidator() ,userController.createUser);
router.put('/:userid',validator.userValidator(), userController.updateUser);
router.delete('/:userid',userController.deleteUser);

module.exports = router