const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
    });
  });

router.post('/product', (req, res, next) => {
  products.push({ title: req.body.title });
  
  res.redirect(301, '/');
});


module.exports = {
  routes: router,
  products: products
};