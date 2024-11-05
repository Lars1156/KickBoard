const User = require('../model/user');
const userServices = require('../services/userServices');

async function registerUser(req,res){
    try {
         const {userName, email , password}= req.body;
         console.log("User " , req.body);
         
         if (!userName && !email && !password) {
            return res.status(400).json({msg:"Enter the all User details"});
         }else if (!userName) {
            return res.status(400).json({msg:'Enter the valid UserName'});
         }else if(!email){
            return res.status(400).json({msg:'Enter the Vaild email Name'});
         }else if(!password){
            return res.status(400).json({msg:'Enter the Vaild Password'});
         }else{
            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(400).json({ msg: "User with this email already exists" });
            }
            const user = {
                userName:userName,
                email: email,
                password:password
            }
            console.log('User deatails' , user);
            
            const addData = new User(user);
            console.log("User data ", addData);
            
            await addData.save();
            res.status(200).json({msg:"User Added successfully"});
         }
    } catch (error) {
        return  res.status(400).json({msg:"User is Not added server"});
    }
};
async function loginUser(req,res){
    try {
         const {email , password} =req.body;
         const checkData = await User.findOne({email , password});
         if(!checkData){
            return res.status(401).json({msg:"User does not exist"});
        }else {
            const token = setUser(checkData);
            return res.status(200).json({msg: "Successfully Logged In", data: checkData, token: token});
        }
      
    } catch (error) {
        return  res.status(400).json({msg:"User is Not added server"});
    }
}

module.exports = {
    registerUser ,
    loginUser
}