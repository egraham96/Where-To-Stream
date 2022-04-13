const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.user_password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true,
      validate: {
        isEmail: true
      }
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.user_password = await bcrypt.hash(newUserData.user_password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.user_password) {
          updatedUserData.user_password = await bcrypt.hash(updatedUserData.user_password, 10);
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;