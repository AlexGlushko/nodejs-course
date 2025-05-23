const Product = require('../models/product');
const Cart = require('../models/cart');



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

    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = [];
            let total = 0;

            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);

                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                    total += product.price * cartProductData.qty;
                }
            }

            res.render('shop/cart', { 
                pageTitle: 'Cart', 
                cart: {
                    products: cartProducts,
                    totalPrice: total
                } 
            });
        });
    });

};

module.exports.postCart = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId, (product) => {
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Product Not Found' });
        }
        console.log('Product added to cart:', product.id);
        Cart.addProduct(product.id, product.price);
        res.redirect('/cart');
    });
};


module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout'});
};
module.exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { pageTitle: 'Orders'});
};