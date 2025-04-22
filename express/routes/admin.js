const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
  });

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect(301, '/admin/add-product');
});


module.exports = router;