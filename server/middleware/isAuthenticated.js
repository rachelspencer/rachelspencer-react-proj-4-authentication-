//uses the dotenv package to look into the .env module and access its environmental variables
require('dotenv').config()
//'jsonwebtoken' is a third party library, provides a way to generate and verify JSON web tokens. This stores this library to the jwt variable. 
const jwt = require('jsonwebtoken')
//destructures SECRET off .env 
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        //stores the Authorization header token from the req
        const headerToken = req.get('Authorization')

        //check to see if there is a token

        //if no token, 'ERROR IN auth middleware' is rendered and 401 code logged
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        // establishes a variable but no assigned value yet
        let token

        // if there is a headertoken, function will proceed to use the verify method form the jwt library and decode the headerToken using the SECRET. 
        // if verified, the next() function is called and passes control to the next middleware function
        // if fails, err status code logged
        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (error) {
            error.statusCode = 500
            throw error
        }

        //if user cannot be verified then a 'Not authenticated' err is rendered, 401 status code logged
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}