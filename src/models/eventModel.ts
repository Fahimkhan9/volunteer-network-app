import mongoose, { Schema } from "mongoose";
import { userSchema } from "./userModel";


export const eventSchema= new Schema({
    name:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
        index: true
    },
    description:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
        index: true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    ownerId:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    owneremail:{
        type:String,
        required:true
    },
    participants:{
        type:[{
            id:String,
            email:String,
            username:String 
        }],
        default:undefined
    }
},{timestamps:true})
export const Event = mongoose.models.Event ||  mongoose.model("Event", eventSchema);