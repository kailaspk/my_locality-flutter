const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');


let userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'please enter a name'],
        unique: true,
        minlength: [2, 'minimum name length is 2 characters']

    },
    email: {
        type: String,
        require: [true, 'please enter an email'],
        unique: true,
        validate: [isEmail, 'please enter a valid email']
    },

    password: {
        type: String,
        require: [true, 'please enter an apssword'],
        minlength: [8, 'minimum password length is 8 characters']
    },
    role:{
        type: String,
        default: 'user'
    }
    // firstname: {
    //     type: String,
    //     require: [true, 'please enter a name'],
    //     minlength: [2, 'minimum name length is 2 characters']
    // },
    // lastsname: {
    //     type: String
    // },
    // businessname: {
    //     type: String
    // },
    // website: {
    //     type: String
    // },
    // number: {
    //     type: String,
    //     require: [true, 'please enter a your pnone number'],
    //     minlength: [10, 'minimum length of phone number is  is 10 characters'],
    //     maxlength: [12, 'maximum length is 12 characters']

    // },
    // addressLine1: {
    //     type: String,
    //     require: [true, 'please enter your address'],
    //     minlength: [5, 'minimum length of address must be is 5 characters'],
    // },
    // addressLine2: {
    //     type: String,
    // },
    // city: {
    //     type: String
    // },
    // state: {
    //     type: String
    // },
    // zip: {
    //     type: String,
    //     require: true
    // },
    // country: {
    //     type: String
    // // },
    // isVerified: {
    //     type: Boolean,
    //     default: false
    // }
},{ timestamps: true });

//encrypt
userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(this.password, salt)
        this.password = hashpass
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Invalid Credentials')
    }
    const check = await bcrypt.compare(password, user.password)
    if (!check) {
      throw new Error('Invalid password')
    }
    return user
  }



const User = mongoose.model('user', userSchema)
module.exports = User