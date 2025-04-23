const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {

        const dataStoragePath = path.join(rootDir, 'data', 'products.json');

        const fileData = fs.readFile(dataStoragePath, (err, fileData) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileData);
            }
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
        const dataStoragePath = path.join(rootDir, 'data', 'products.json');

        fs.readFile(dataStoragePath, (err, fileData) => {
            if (err) {
                callback([]);
            }
            callback(JSON.parse(fileData));
        });

    }
}