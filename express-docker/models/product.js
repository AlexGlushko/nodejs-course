const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const db = require('../utils/database');

const crypto = require("crypto");

const dataStoragePath = path.join(rootDir, 'data', 'products.json');


const getProductsFromFile = (callback) => {
    fs.readFile(dataStoragePath, (err, fileData) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileData));
        }
    });
}


module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = crypto.randomUUID();
    }

    save() {
        return db.execute(
            'INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)', 
            [
                this.title, 
                this.imageUrl, 
                this.description, 
                this.price
            ]
        )
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id){
        return db.execute('SELECT * FROM products WHERE id = ?', [id]);
    }

    static updateProduct(id, updatedProduct) {

        return this.findById(id).then(([rows,]) => {
            const product = rows[0];
            if (!product) {
                throw new Error('Product not found');
            }

            return db.execute(
                'UPDATE products SET title = ?, imageUrl = ?, description = ?, price = ? WHERE id = ?',
                [
                    updatedProduct.title,
                    updatedProduct.imageUrl,
                    updatedProduct.description,
                    updatedProduct.price,
                    id
                ]
            );
        }).catch((err) => {
            console.log(err);
        });


    }

    static deleteProduct(id) {
        return db.execute('DELETE FROM products WHERE id = ?', [id]);
    }
} 