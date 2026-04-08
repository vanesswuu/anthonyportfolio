const User = require('../models/User');

// @desc register user
// @route POST/api/auth/register

exports.register = async (req, res, next) => {
   
    try{
        const {name, email, password} = req.body;   

        const user = await User.create({
            name,
            email,
            password
        })

        const token = await user.getToken();

        res.status(201).json({
            success: true,
            message: 'user created',
            token: token,
            data: user
    })
    } catch(error){
        next(error);
    }
    
}


// @desc login user
// @route POST/auth/login

exports.login = async (req, res, next) => {

    try{

            const { email , password} = req.body;

            if(!email || !password){
                res.status(401).json({
                    success: false,
                    message: 'please provide email and password'
                })
            }

            const user = await User.findOne({email}).select('+password');

            if(!user){
                return res.status(401).json({
                    success: false,
                    message: 'invalid credentialssss'
                })
            }

            const isMatch = await user.isMatch(password);

            if(!isMatch){
                return res.status(401).json({
                    success: false,
                    message: 'invalid credentials'
                })
            }

            const token = await user.getToken();

            res.status(200).json({
                success: true,
                message: 'logged in',
                token: token,
                data: user
            })

    } catch(error){
        next(error);
    }


}

exports.getMe = async (req, res, next) => {

    try {

        const user = await User.findById(req.user.id); //have get.user because of protect


        //there should be an error handler here


        res.status(200).json({
            success: true,
            data: user
        })



    } catch(error){
        next(error)
    }

}



