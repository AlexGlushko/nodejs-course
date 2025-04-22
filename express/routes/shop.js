const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../utils/path');

router.get('/', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views', 'shop.html'), {
        pageTitle: 'Shop',
        hasProducts: false,
        activeShop: true,
        productCSS: true
    });
  });
  

module.exports = router;