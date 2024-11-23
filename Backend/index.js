const express = require("express");
const app = express();
const PORT = 4000;
const Users = require("./models/user");
const dotenv=require("dotenv")
dotenv.config()
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors"); //To connect backend and frontend

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests'

// Endpoint for user registration
app.post('/signup', async (req, res) => { 

  const { username, email, password } = req.body; 
  // Validate input fields
  if (!username || !email || !password){
    return res.status(400).json({ errors: "Please provide all required fields" }) 
  } 

  try{

    // Check for existing user with the same email
    let check = await Users.findOne({ email }); 
    
    if (check) { 
      return res.status(400).json({ success: false, errors: "Existing User Found With Same Email Address" }); 
    }

    // Hash the password and create the user 
    bcrypt.hash(password, 10, async function(err, hash) { 

      if (err) { 
        return res.status(500).json({ success: false, errors: "Error hashing password" }); 
      } 

      let newUser = await Users.create({ username, email, password: hash });
      const data = { user: { id: newUser.id } };
      const token = jwt.sign(data, process.env.JSON_WEBSECRET); 
      res.json({ success: true, token }); 
      
    });
  }

  catch (error) { 
    res.status(500).json({ success: false, errors: "Error creating user" });
  }
});


// Creating Endpoint for User Login

app.post('/login', async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body
  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ errors: "Please Provide Your Credentials!" });
  }

  try{
    let user = await Users.findOne({ email });
    if(!user){
      return res.json({ success: false, errors: "Wrong Email Address" })
    }
    bcrypt.compare(password,user.password,function(err,result){
      if(result == true){
        const token = jwt.sign({
            id:user._id,
            email:user.email
        } , process.env.JSON_WEBSECRET , {expiresIn:"1h"})
        return res.json({success: true , token})
      }
      else{
          return res.json({ success: false, errors: "Wrong Password" });
      } 
    })
  }
  catch(error){
    console.log(error)
  }     
});

//Creating middleware to fetch user
//(We will take auth-token and convert it into user id for this we had taken middleware)

const fetchUser = async (req,res,next)=>{
  const token=req.headers.authorization?.split(" ")[1];
  
  if(!token){
    res.status(401).send({errors:"Please authenticate using valid token"})
  }

  try {
    const data = jwt.verify(token,process.env.JSON_WEBSECRET);
    req.user = data.user;
    next();
  }
  catch (error) {
    res.status(401).send({errors:"Please authenticate using valid token"})
  }
}


//Creating endpoint for adding products in cart data

app.post('/addtocart', fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id }); //Will get it through middleware
  
  // Initialize cartData if it doesn't exist
  if (!userData.cartData) {
      userData.cartData = {};
  }

  // Initialize the item in cartData if it doesn't exist
  if (!userData.cartData[req.body.itemId]) {
      userData.cartData[req.body.itemId] = 0;
  }

  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
});


// app.post('/addtocart',fetchUser,async (req,res)=>{
//     console.log("Added",req.body.itemId);
//     let userData = await Users.findOne({_id:req.user.id}); //Will get it through middleware
//     userData.cartData[req.body.itemId] += 1;
//     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
//     res.send("Added")
// })


//Creating endpoint for removing product from cartdata

app.post('/removefromcart',fetchUser,async (req,res) => {
    console.log("Removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});//Will get it through middleware
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})


//Creating endpoint to get cartdata
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id})//Will get it through middleware
    res.json(userData.cartData)
})

//Check for the port number and mongodb connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('MongoDB connected')
    app.listen(PORT,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(`listening on PORT ${PORT}`)
        }
    })
})