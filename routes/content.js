const express = require('express');
const validator = require('../validation/validator');
const router = express.Router();

const controller = require('../controller/contentController');
const validateToken = require('../middleware/Auth');

router.get('/', validateToken, controller.getAllContents);

router.get('/:contentid',validateToken, controller.getOneContent);

router.get('/group/:group',validateToken, controller.getContentGroup);

router.post('/', validator.contentValidator(), validateToken ,controller.createContent);

router.put('/:contentid',validator.contentValidator(),validateToken, controller.updateContent);

router.delete('/:contentid',validateToken, controller.deleteContent);

module.exports = router;