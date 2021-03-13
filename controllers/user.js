const User = require('../models/user');

exports.getUserById = (req, res,  next, id) =>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                err:"no user find in DB"
            })
        }
        req.profile =  user;
        next();
    })
}

exports.getUser= (req,res,next)=>{
    //:TODO get back here for password
    res.json(req.profile);
}
