const Product = require('../models/product');
const Order = require('../models/order');


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
                return existingCart.update({ totalPrice: totalPrice, totalItems: products.length });
            });
    })
    .then(() => {
        res.redirect('/cart');
    })
};

module.exports.postCartRemove = (req, res, next) => {
    const productId = req.body.productId;

    let existingCart;

    req.user
    .getCart()
    .then(cart => {
        existingCart = cart;
        return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
        const product = products[0];
        return existingCart.removeProduct(product);
    })
    .then(() => {
        return existingCart.getProducts()
            .then(products => {
                let totalPrice = 0;
                products.forEach(product => {
                    totalPrice += product.cartItem.quantity * product.price;
                });
                return existingCart.update({ totalPrice: totalPrice, totalItems: products.length });
            });
    })
    .then(() => {
        res.redirect('/cart');
    })
};


module.exports.postCartClear = (req, res, next) => {
    let existingCart;

    req.user
    .getCart()
    .then(cart => {
        existingCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return Promise.all((products.map(product => {
            return existingCart.removeProduct(product);
        })));
    })
    .then(() => {
        return existingCart.update({ totalPrice: 0, totalItems: 0 });
    })
    .then(() => {
        res.redirect('/cart');
    })
};


module.exports.postCheckout = (req, res, next) => {
    let existingCart;

    let products;
    req.user
    .getCart()
    .then(cart => {
        existingCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        if (products.length === 0) {
            return res.redirect('/cart');
        }
        products = products;
        return req.user.createOrder({ totalPrice: existingCart.totalPrice, totalItems: products.length })
            .then(order => {
                return order.addProducts(products.map(product => {
                    product.orderItem = { quantity: product.cartItem.quantity };
                    return product;
                }));
            })
            .then(() => {
                return existingCart.setProducts(null);
            });
    
        
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    });
};





module.exports.getOrders = (req, res, next) => {

    req.user
    .getOrders({ include: ['products'] })
    .then(orders => {
        console.log('Orders:', orders);
        res.render('shop/orders', { 
            pageTitle: 'Orders', 
            orders: orders,
        });
    })
};