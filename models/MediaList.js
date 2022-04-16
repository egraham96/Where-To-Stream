const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MediaList extends Model { }

MediaList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        media_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'media',
                key: 'id',
            },
        },
        media_type: {
                type: DataTypes.STRING,
                references: {
                    model: 'media',
                    key: 'type',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'medialist',
    }
);

module.exports = MediaList;
