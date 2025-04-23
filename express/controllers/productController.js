const products = [];

module.exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
    });
  };

module.exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    
    res.redirect(301, '/');
};

module.exports.getProducts = (req, res, next) => {
    console.log('shop.js', products);
      res.render('shop',{
          prods: products,
          pageTitle: 'Shop',
      });
  };