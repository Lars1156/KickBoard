const User = require('../model/user');
const jsw = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const registerUser = async(userName , email , password)=>{
    const existingUser = await User.findOne({email});
    if(!existingUser){
       throw new error('Email is Alredy Register');
    }
    const user = new User({userName , email , password});
    await user.save();
    return user;
};

const loginUser = async(email , password) =>{
    const user = await User.findOne({email});
    if(!user){
        throw new error('User is allready Existes');
    }

    const isMatch  = await user.isMatchPassword(password)
    if(!isMatch){
        throw new error('Password is invaild ');
    }
    const token = await user.generateAuthToken();
    return { user, token };
}

module.exports = {
    registerUser,
    loginUser
}