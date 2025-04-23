const Product = require('../models/product');



module.exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list',{
            prods: products,
            pageTitle: 'All Products',
        });
    });
    
};

module.exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId, (product) => {
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Product Not Found' });
        }

        res.render('shop/product-details',{
            product: product,
            pageTitle: product.title,
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

module.exports.postCart = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId, (product) => {
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Product Not Found' });
        }
        console.log('Product added to cart:', product.id);
        // Here you would typically add the product to the user's cart
        // For now, we'll just redirect to the cart page
        res.redirect('/cart');
    });
};


module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout'});
};
module.exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { pageTitle: 'Orders'});
};