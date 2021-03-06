const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { rawListeners } = require("npm");


// logout user 
exports.singout = (req, res) => {
    res.clearCookie("token");
    res.json({
    message: "user singout succesfully",
  });
};

// checking user isSingin
exports.IsSingIn =  expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
});

//custom middleware
exports.isAuthenticated = (res ,req ,next)=>{
  let checker = req.profile && req.auth && req.profile._id === req.auth._id
  if(!checker){
    return res.status(403).json({
      err:"ACCESS DENIED"
    })
  }else{
    next();
  }
 
}

// isAdmin

exports.isAdmin = (res ,req ,next)=>{
  if(req.profile.role === 0){
    res.status(403).json({
      error:"You are not Admin,Access Denied"
    })
  }
  next();
 }

exports.singup = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save in DB",
      });
    }
    return res.send(user);
  });
};

exports.singin = (req, res) => {
  const { email, password } = req.body;
  const error = validationResult(req);
  // validation check
  if (!error.isEmpty()) {
    return res.status(422).json({
      error: error.array()[0].msg,
    });
  }
  // finding user in database
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
     return  res.status(400).json({
        errr: "user email does't exist",
      });
    }
    // checking password
    if (!user.authenticate(password)) {
      return res.status(401).json({
        err: "Email and  Password do not matched",
      });
    }
    //creating token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //setting token to cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;

    // sending response to front-end
    return res.json({ token, user: { _id, name, email, role } });
  });
};
