const { verifyToken } = require('../helpers/jwt.js')
const { User, Food } = require('../models/index.js')

async function authentication(req, res, next) {
    let access_token = req.headers.access_token
    if (access_token) {
        try {
            let payload = verifyToken(access_token)
            let currentUser = await User.findOne ({
                where: {
                    email: payload.email
                }
            })
            if (currentUser) {
                req.currentUser.UserId = currentUser
                next();
            }
            else {
                next({
                    code: "401",
                    message: "Please login for using the feature"
                })
            }
        }
        catch (err) {
            next({
                code : "500",
                message: "internal server error"
            })
        }
    }
}

async function authorization (req, res, next) {
    let foodId = Number(req.params.id)
    try {
        let currentFood = await Food.findByPk(foodId)
        if (currentFood) {
            if (currentFood.UserId == req.currentUser.id) {
                next()
            }
            else {
                next({
                    code: "401",
                    message: "Not Authorized"
                })
            }
        }
        else {
            next ({
                code: "404",
                message: "Not Found"
            })
        }
    }
    catch (err) {
        next ({
            code: "500",
            message: "Internal server error"
        })
    }
}

module.exports = {
    authentication,
    authorization
}