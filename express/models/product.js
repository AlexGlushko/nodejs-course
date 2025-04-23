const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

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
    constructor(title) {
        this.title = title;
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
} 