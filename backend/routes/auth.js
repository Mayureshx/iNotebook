const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');//used to faciliate the secure communication between client and server(using token)

const JWT_SECREAT ='Mayureshx@123'

const fetchuser= require("../Middleware/fetchuser")



//Route 1 : Creating a User using : POST "api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter the valid name").isLength({ min: 3 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Password must be 5 characters long").isLength({ min: 5 }),
  ], //[] array use for validation checks
  async (req, res) => {
    let success = false;
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    const errors = validationResult(req); //it validates request according to array[]
    if (!errors.isEmpty()) {
      //if errors contains errors
      return res.status(400).json({success , errors: errors.array() }); //then it send response 400 bad request and errors of an array
    }

    //check whethere user with this email exists already
    //wrapped under try-catch coz u never what will happen with db(error)
    try {
      let user = await User.findOne({ email: req.body.email });

      //if user already present in db
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with email already exists" });
      }
      const salt = await bcrypt.genSalt(10);//creating salt
      const secPass= await bcrypt.hash(req.body.password,salt);//creating hash and adding both password + salt
      user = await User.create({
        //use to save request in db(User)
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data ={
        user:{
            id : user.id
        }
      }
     //storing data and JWT_SECREAT in token
      const authToken= jwt.sign(data,JWT_SECREAT);//with JWT_SECREAT I'LL know if anyone has tempered my token
     success = true;
      res.json({success,authToken});//i'll give this token once user signup successfully and when they come again i'll check token and convert it into above "data"
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);





//Route 2 :Aunthenticate a User using : POST "api/auth/login"
router.post('/login',[
    body('email','Enter the valid email').isEmail(),
    body('password','Password can not be blank').exists(),

],async(req,res)=>{
  let success =false;
    const errors = validationResult(req); //it validates request according to array[]
    if (!errors.isEmpty()) {
      //if errors contains errors
      return res.status(400).json({ errors: errors.array() }); //then it send response 400 bad request and errors of an array
    }
      
    //destructuring request body into email and password (while login)
    const {email,password} = req.body;

    try{
        //Find email exist or not in db
        let user = await User.findOne({email});
        //if not
        if(!user)
        {
          success=false;
            return res.status(400).json({success,error: "Please try to login with correct credentials"});
        }
        
        //comparing "password" (while login) with "user.password" in db using bcrypt(it bcrypt and compare)
        const passwordCompare = await bcrypt.compare(password,user.password);
        //if not match
        if(!passwordCompare)
        {
          success = false;
            return res.status(400).json({success,error: "Please try to login with correct credentials"});
        }

        const data ={
            user:{
                id : user.id
            }
          }
         //storing data and JWT_SECREAT in token
          const authToken= jwt.sign(data,JWT_SECREAT);//with JWT_SECREAT I'LL know if anyone has tempered my token
          success=true;
          res.json({success,authToken});//i'll give this token once user login successfully and when they come again i'll check token and convert it into above "data"
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }

})







//Route 3 : Get loggedin user details using : POST "api/auth/getuser", login required

//middleware is flexible when want to update code in future
//fetchuser : Is a middleware to get token and fetch userId from token and send it here to get user details
//first after hitting endpoint fetchuser will run then next async(fun)
router.post("/getuser",fetchuser,async(req,res)=>
{

  try {
    const userId = req.user.id;
  const user = await User.findById(userId).select("-password");//while fetching details we are not fetching "password"
  res.send(user);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
  
})



module.exports = router;
