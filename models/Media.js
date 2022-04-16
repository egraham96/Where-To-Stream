const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Media extends Model {}

Media.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    image: {
      type: DataTypes.STRING, 
      allow: true, 
      defaultValue: null
    },
    average_rating: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'media',
  }
);

module.exports = Media;
