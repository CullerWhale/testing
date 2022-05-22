const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SleepTag extends Model {}

SleepTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        sleep_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'sleep',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tag',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'sleep_tag'
    }
);

module.exports = SleepTag;