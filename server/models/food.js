'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.User)
    }
  };
  Food.init({
    title:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please input your Title"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please input the Price"
        }
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please input the Ingredients"
        }
      }
    },
    tag: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please choose a Tag for the Food"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};