const express = require('express');
const router = express.Router();
const errroController = require('../controllers/errorController');

router.use('/', errroController.getError);
  

module.exports = router;