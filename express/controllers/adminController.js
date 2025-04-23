const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
    });
  };

module.exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    
    res.redirect(301, '/');
};

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products',{
            prods: products,
            pageTitle: 'Admin Products',
        });
    });
    
  };