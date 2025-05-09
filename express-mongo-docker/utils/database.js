const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'express_db', 
    'root', 
    '1234', 
    {
        host: 'mysql',
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            // acquire: 30000,
            // idle: 10000
        }
    }
);



module.exports = sequelize;

