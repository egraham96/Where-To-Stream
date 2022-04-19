const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MediaList extends Model {}

MediaList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    media_id: {
      primaryKey:false,
      type: DataTypes.INTEGER,
      references: {
        model: 'media',
        key: 'id',
      },
    },
    user_id: {
      primaryKey:false,
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
