const express = require('express');
const validator = require('../validation/validator');
const router = express.Router();

const controller = require('../controller/contentController');

router.get('/:userid', controller.getAllContents);

router.get('/:userid/:contentid', controller.getOneContent);

router.get('/:userid/group/:group', controller.getContentGroup);

router.post('/:userid', validator.contentValidator() ,controller.createContent);

router.put('/:userid/:contentid',validator.contentValidator(),controller.updateContent);

router.delete('/:userid/:contentid',controller.deleteContent);

module.exports = router;