const { DataTypes } = require('sequelize')

const { sequelize } = require('../util/database')

// Defines the data model using the Sequelize instance
module.exports = {
    Post : sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        privateStatus: DataTypes.BOOLEAN
    })
};