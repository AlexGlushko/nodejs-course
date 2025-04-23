const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
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
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(dataStoragePath, JSON.stringify(products), (err) => {
               if (err) {
                   console.log(err);
               }
                console.log('File written successfully');
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(id, callback){
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
} 