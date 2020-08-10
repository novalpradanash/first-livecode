'use strict';
const { hashPassword } = require ('../helpers/bcrypt.js')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Food)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate : {
        isEmail: {
          args: true,
          msg: "Please input correct format for Email"
        },
        notEmpty: {
          args: true,
          msg: "Please input your Email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please input your password"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password)
  })

  return User;
};