const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Sleep extends Model {}

Sleep.init(
    {
       id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true
       },
       title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 30]
            }
       },
       sleep_description: {
           type: DataTypes.STRING,
           allowNull: true
       },
       hours_slept: {
           type: DataTypes.DECIMAL,
           allowNull: true
       },
       dream_sw: {
           type: DataTypes.BOOLEAN,
           allowNull: false
       },
       dream_description: {
           type: DataTypes.STRING,
           allowNull: true
       },
       user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
       }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'sleep',
    }
);

module.exports = Sleep;