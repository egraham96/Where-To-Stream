const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class StreamingList extends Model { }

StreamingList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        media_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'media',
                key: 'id',
            }},
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true,
            unique:true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'streaminglist',
    }
);

module.exports = StreamingList;
