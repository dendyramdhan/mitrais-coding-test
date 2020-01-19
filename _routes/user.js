const express = require('express');
const router = express.Router();
const userController = require('../_controllers').user;
const userValidator = require('../_validators').user;

router.post('/authenticate', userValidator.authenticate, userController.authenticate);
router.post('/register', userValidator.create, userController.register);
router.get('/', userController.getAll);
router.get('/current', userController.getCurrent);
router.get('/:id', userController.getById);
// router.put('/:id', userController.update);
// router.delete('/:id', userController._delete);

module.exports = router;
