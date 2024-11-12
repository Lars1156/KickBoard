const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret  ="Kishan@1156";

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
    role: {
      type: String,
      enum: ['Admin', 'Manager', 'Developer', 'Designer', 'QA', 'Intern'],
      default: 'Developer',
    },
    department: {
      type: String,
      enum: ['Development', 'Design', 'Quality Assurance', 'Management'],
      required: true,
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

  userSchema.method.genrateAuthToken= async function(){
    const user = this;
    const token = jwt.sign({_id : user. _id.toString()}, secret , {expiresIn : '2h'});
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  };

  userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  };

  userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
  };

const User = mongoose.model ('User' , userSchema);

module.exports = User;