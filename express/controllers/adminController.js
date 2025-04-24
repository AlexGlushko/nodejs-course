const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
    });
  };

module.exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        parseInt(req.body.price)
    );
    product.save();
    
    res.redirect(301, '/');
};

module.exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    

    Product.findById(productId, (product) => {
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Product Not Found' });
        }
    
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            editeableProduct: product,
            edit: true
        });
    });
};


module.exports.postEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = parseInt(req.body.price);
    
    updatedProduct = new Product(
        title,
        imageUrl,
        description,
        price
    );
    updatedProduct.id = productId;

    Product.updateProduct(productId, updatedProduct, () => {
        res.redirect(301, '/products/' + productId);
    });


};


module.exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products',{
            prods: products,
            pageTitle: 'Admin Products',
        });
    });
    
  };

module.exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    
    Product.deleteProduct(productId, () => {
        res.redirect(301, '/admin/products');
    });
}