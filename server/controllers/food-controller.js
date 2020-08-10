const { Food } = require('../models/index.js')
require('dotenv').config()
class FoodController {

    //Create Food
    static async createFood(req, res, next) {
        let title = req.body.title;
        let price = req.body.price;
        let ingredients = req.body.ingredients;
        let tag = req.body.tag;
        let UserId = req.currentUser.UserId;

        try {
            let createFood = await Food.create({
                title,
                price,
                ingredients,
                tag,
                UserId
            })
            res.status(201).json(
                {
                    title: createFood.title,
                    price: createFood.price,
                    ingredients: createFood.ingredients,
                    tag: createFood.tag,
                    UserId: createFood.UserId
                }
            )
        }
        catch (err) {
            next(err)
        }
    }

    //Read Food
    static readFoodByUserId(req, res, next) {
        let currentUserId = req.currentUser.id;
        Food.findAll({
            where: {
                UserId: currentUserId 
            }
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    //Delete Food
    static deleteFood(req, res, next) {
        let foodId = Number(req.params.id)
        let obj
        Food.findByPk(foodId)
            obj = result

            return Food.destroy({
                where: {
                    id: foodId
                }
            })
            .then(result => {
                res.status(201).json(obj)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = FoodController