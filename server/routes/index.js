const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller.js')
const FoodController = require('../controllers/food-controller')
const { authentication, authorization } = require('../middlewares/auth.js')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/foods', authentication, authorization, FoodController.createFood)
router.get('/foods', authentication, authorization, FoodController.readFoodByUserId)
router.delete('/foods:id', authorization, FoodController.deleteFood)



module.exports = router
