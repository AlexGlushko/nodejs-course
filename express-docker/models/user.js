const Sequileze = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    id: {
        type: Sequileze.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequileze.STRING,
        allowNull: false
    },
    email: {
        type: Sequileze.STRING,
        allowNull: false
    }
});

module.exports = User;