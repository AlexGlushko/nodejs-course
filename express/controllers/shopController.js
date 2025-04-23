const Product = require('../models/product');



module.exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list',{
            prods: products,
            pageTitle: 'All Products',
        });
    });
    
  };

module.exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index',{
            prods: products,
            pageTitle: 'Home page',
        });
    });
};


module.exports.getCart = (req, res, next) => {
    res.render('shop/cart', { pageTitle: 'Cart' });
};

module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout'});
};