const Product = require('../models/product');
const Cart = require('../models/cart');



module.exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then((products) => {
        res.render('shop/product-list',{
            prods: products,
            pageTitle: 'All products',
        });
    })
    .catch((err) => {
        console.log(err);
    });
    
};

module.exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;

    Product.findByPk(productId)
    .then((product) => {
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Product Not Found' });
        }
    

        res.render('shop/product-details',{
            product: product,
            pageTitle: product.title,
        });
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then((products) => {
        res.render('shop/index',{
            prods: products,
            pageTitle: 'Home page',
        });
    })
    .catch((err) => {
        console.log(err);
    });
};


module.exports.getCart = (req, res, next) => {

    let existingCart;

    req.user
    .getCart()
    .then(cart => {
        existingCart = cart;
        return cart.getProducts();
    })
    .then((products) => {
        console.log('Products in cart:', products);
        res.render('shop/cart', { 
            pageTitle: 'Cart', 
            products: products,
            totalPrice: existingCart.totalPrice,
            
        });
    })
    .catch(err => {
        console.log(err);
    });

};

module.exports.postCart = (req, res, next) => {
    const productId = req.body.productId;

    let existingCart;

    req.user
    .getCart()
    .then(cart => {
        existingCart = cart;
        return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }

        if (product) {
            const oldQuantity = product.cartItem.quantity;
            const newQuantity = oldQuantity + 1;
            return existingCart.addProduct(product, { through: { quantity: newQuantity } });
        }

        return Product.findByPk(productId)
            .then(product => {
                return existingCart.addProduct(product, { through: { quantity: 1 } });
            });
    }).
    then(() => {
        return existingCart.getProducts()
            .then(products => {
                let totalPrice = 0;
                products.forEach(product => {
                    totalPrice += product.cartItem.quantity * product.price;
                });
                return existingCart.update({ totalPrice: totalPrice });
            });
    })
    .then(() => {
        res.redirect('/cart');
    })
};


module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout'});
};
module.exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { pageTitle: 'Orders'});
};