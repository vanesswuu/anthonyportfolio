const User = require('../models/User');
const jwt = require('jsonwebtoken');


//authenticate
exports.protect = async (req, res, next) => {

    let token;

    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token){
        return res.status(401).json({
            success: false,
            message: 'unauthorized'
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

         req.user = await User.findById(decoded.id);  //creates a new object inside req called user
        
        if(!req.user){
            return res.status(401).json({
                success: false,
                message: 'user not found'
            })
        }

        next();

    } catch(error){
        return res.status(401).json({
            success: false,
            message: 'unauthorized'
        })
    }

}


exports.authorize = (...roles) => {

    return(req, res, next) =>{
        
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: `user role ${req.user.role} is not authorized to access thius route`
            })
        }
        next();

    }


}