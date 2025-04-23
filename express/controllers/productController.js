const Product = require('../models/product');


module.exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
    });
  };

module.exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    
    res.redirect(301, '/');
};

module.exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    console.log('shop.js', products);
      res.render('shop',{
          prods: products,
          pageTitle: 'Shop',
      });
  };