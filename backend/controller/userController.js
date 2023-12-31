const User =require('../models/userModel');
const asyncHandler =require('express-async-handler');
const { generateRefreshToken }=require('../config/refreshToken');
const { generateToken } = require('../config/jwToken');

const createUser =asyncHandler(async(req,res) =>{

    const email =req.body.email;
    const findUser =await User.findOne({ email:email });
    if(!findUser)
    {
        //Create a new User
        const newUser =User.create(req.body);
        res.json(newUser);
    }
    else{
       
        throw new Error("User Already Exist");

    }
});


const loginUserController =asyncHandler(async(req,res) =>{

    const { email,password} =req.body;
    const findUser =await User.findOne({email});
   
    if(findUser && (await findUser.isPasswordMatched(password)))
    {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            {
              refreshToken: refreshToken,
            },
            { new: true }
          );
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
          });

        res.json({
            _id:findUser?._id,
            firstname:findUser?.firstname,
            lastname:findUser?.lastname,
            email:findUser?.email,
            mobile:findUser?.mobile,
            token:generateToken(findUser?._id),



        });
    }
    else
    {
        throw new Error("Invalid Details");
    }

});

const vertifyUser =asyncHandler(async(req,res,next) =>{
  const token =req.cookies.token;
  if(!token)
  {

  }
  else
  {

  }
})

const dashboard =asyncHandler(async(req,res)=>{
 // const token =req.cookies.token;
 // console.log(token);

    
})



const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
      refreshToken: "",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  });


module.exports={ createUser,loginUserController,logout,dashboard};