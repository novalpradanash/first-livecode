const bcrypt = require ('bcryptjs')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePassword(input, database) {
    return bcrypt.compareSync(input, database)
}

module.exports = {
    hashPassword,
    comparePassword
}