const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller.js')
const FoodController = require('../controllers/food-controller')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/foods', FoodController.createFood)
router.get('/foods', FoodController.readFoodByUserId)
router.delete('/foods:id', FoodController.deleteFood)



module.exports = router
