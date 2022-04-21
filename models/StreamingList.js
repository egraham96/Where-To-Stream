const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class StreamingList extends Model { }

StreamingList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
        },
        media_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'media',
                key: 'id',
            allowNull:false,
            },
        },
        type: {
            type: DataTypes.STRING,
            allowNull:false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            
        }
    },
    {
        sequelize,
        indexes:[{unique:true,
        fields:['link']}],
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'streaminglist',
    }
);

module.exports = StreamingList;
