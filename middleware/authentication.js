const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/unauthenticated');


const auth = async(req, res, next)=>{
const authHeader = req.headers.authorization;
console.log(authHeader)
 if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Token missing or invalid"
        });
    }
const token = authHeader.split(' ')[1];
try{
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = {userId:payload.id, name:payload.name};
next();
}
catch(error){
throw new UnauthenticatedError("Authorization Invalid");

}


}

module.exports = auth;