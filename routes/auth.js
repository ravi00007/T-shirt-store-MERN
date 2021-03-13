const router = require("express").Router();
const { singout, singup , singin ,IsSingIn} = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/singup",
  [
    check("name", "name should be atleast 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 3 char").isLength({ min: 3 }),
  ],
  singup
);

router.post(
    "/singin",
    [
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 3 }),
    ],
    singin
  );
router.get("/singout", singout);

router.get('/test',IsSingIn,(req,res)=>{
  res.json(req.auth)
});

module.exports = router;
