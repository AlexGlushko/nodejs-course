const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const dataStoragePath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {

    static addProduct(id, productPrice) {
        fs.readFile(dataStoragePath, (err, fileData) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileData);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if (existingProduct) {
                // updatedProduct = {...existingProduct};  unnecessary copying
                updatedProduct = existingProduct;
                updatedProduct.qty = updatedProduct.qty + 1;
                // cart.products = [...cart.products];   wtf going on here??
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1};
                // cart.products = [...cart.products, updatedProduct];  and here
                cart.products.push(updatedProduct);
            }
            cart.totalPrice = cart.totalPrice + parseInt(productPrice);

            fs.writeFile(dataStoragePath, JSON.stringify(cart), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    };

    static getCart(callback) {
        fs.readFile(dataStoragePath, (err, fileData) => {
            if (err) {
                callback({products: [], totalPrice: 0});
            } else {
                callback(JSON.parse(fileData));
            }
        });
    }
}