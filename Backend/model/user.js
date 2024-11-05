const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// user Schema 
const userSchema = new mongoose.Schema({
    userName :{
        type:String,
        required: true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        trim:true,
        lowercase: true,
        unique: true,
        validate:{
            validator: function(v){
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email address",
        } ,
    },

    password:{
        type:String,
        required:true,
        trim:true,
        minilength:[8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function (v) {
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(v);
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          },
    },

    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
    }, {
      timestamps: true,
});