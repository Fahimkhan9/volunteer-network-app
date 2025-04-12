import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],

    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date

},
    { timestamps: true })


// userSchema.pre("save",async function(next){
//     if(!this.isModified("password")){
//         next()
//     }
//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })
// userSchema.methods.isPasswordCorrect= async function(password:any){
//     return await bcrypt.compare(password, this.password)
// }
// userSchema.methods.generateAccessToken = function () {
//     // short lived access token
//    return jwt.sign({
//         _id:this._id,
//         email:this.email,
//         username:this.username,
//     },process.env.TOKEN_SECRET,{expiresIn:'1d'})
// }

export const User = mongoose.models.User || mongoose.model("User", userSchema);