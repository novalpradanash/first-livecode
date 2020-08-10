const { Food } = require('../models/index.js')
class FoodController {
    static createFood(req, res, next) {
        
    }

    static readFoodByUserId(req, res, next) {

    }

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