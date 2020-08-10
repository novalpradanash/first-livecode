const jwt = require('jsonwebtoken')

function signToken (payload) {
    let access_token = jwt.sign(payload, 'rahasia')
    return access_token
}

function verifyToken(access_token) {
    try {
        let output = jwt.verify(access_token, 'rahasia')
        return output
    }
    catch (err){
        return err
    }
}

module.exports = {
    signToken,
    verifyToken
}