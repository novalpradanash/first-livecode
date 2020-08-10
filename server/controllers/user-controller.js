const { User } = require('../models/index.js')
const { comparePassword } = require('../helpers/bcrypt.js')
const { signToken } = require('../helpers/jwt.js')

class UserController {

    static register(req, res, next) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
            .then(result => {
                res.status(201).json ({
                    id: result.id,
                    email: result.email
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        let inputEmail = req.body.email
        let inputPassword = req.body.password

        User.findOne({
            where: {
                email: inputEmail
            }
        })
            .then(result => {
                if (result !== null) {
                    if (comparePassword(inputPassword, result.password)) {
                        let payload = {
                            email: result.email
                        }
                        let access_token = signToken(payload)
                        res.status(200).json({ access_token })
                    }
                    else {
                        throw {
                            name : "Bad Request"
                        }
                    }
                }

            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController