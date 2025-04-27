import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()
export async function POST(request:NextRequest){
    try {
        const reqBody= await request.json()
       const {token}=reqBody
    
       
       const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
       if(!user){
        return NextResponse.json({msg:'Invalid token'})
       }
      
       await User.findByIdAndUpdate(user._id,{
        isVerified:true,
        verifyToken:undefined,
        verifyTokenExpiry:undefined
       })
       
    //    user.isVerified=true;
    //    user.verifyToken=undefined;
    //    user.verifyTokenExpiry=undefined;
    //    await User.save();
       return NextResponse.json({
        msg:'verified',
        success:true
       })
    } catch (error:any) {
        return NextResponse.json({msg:error.message},{status:500})
    }
}