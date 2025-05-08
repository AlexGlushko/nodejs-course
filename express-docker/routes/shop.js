const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProductDetails);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart/remove', shopController.postCartRemove);
router.post('/cart/clear', shopController.postCartClear);
router.get('/checkout', shopController.postCheckout);
router.get('/orders', shopController.getOrders);
  

module.exports = router;  