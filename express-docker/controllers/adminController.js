const Product = require('../models/product');

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
    });
  };

module.exports.postAddProduct = (req, res, next) => {
    Product.create({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: parseInt(req.body.price)
    })
    .then((result) => {
        res.redirect(301, '/admin/products');
    }
    ).catch((err) => {
        console.log(err);
    });
    
    
};

module.exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    

    Product.findByPk(productId)
    .then((product) => {
        
    
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Product Not Found' });
        }
    
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            editeableProduct: product,
            edit: true
        });
    })

    .catch((err) => {
        console.log(err);
    });


};

module.exports.postEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = parseInt(req.body.price);
    

    Product.findByPk(productId)
    .then((product) => {
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Product Not Found' });
        }
    
        product.title = title;
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;
    
        return product.save();
    })
    .then(() => {res.redirect(301, '/products/' + productId)})
    .catch((err) => {console.log(err);}); 


};


module.exports.getProducts = (req, res, next) => {
    
    Product.findAll()
    .then(products => {
        res.render('admin/products',{
            prods: products,
            pageTitle: 'Admin Products',
        });
    })
    .catch((err) => {
        console.log(err);
    });
  };

module.exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    
    Product.findByPk(productId).then((product) => {
        if (!product) {
            return res.status(404).render('404', { pageTitle: 'Product Not Found' });
        }
    
        return product.destroy();
    })
    .then(() => {
        res.redirect(301, '/admin/products');
    })
    .catch((err) => {
        console.log(err);
    });
}