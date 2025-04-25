import { connectDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request:NextRequest) {
    try {      
       const reqBody= await request.json()
       const {email,password,username}=reqBody
       if([email,password,username].some(i=>i.trim()==='')){
        return NextResponse.json({msg:"All fields are required"})
       }
       const user=await User.findOne({email})
       if(user){
        return NextResponse.json({msg:"user with email already exists"})
       }
       const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
       const newUser=new User({
        email,
        password:hashedPassword,
        username
       })
       const saveuser=await newUser.save()
    //    send verification email
    await sendEmail({email,emailType:"VERIFY",userId:saveuser._id})
       return NextResponse.json({msg:'new user created'})
    } catch (error:any) {
        return NextResponse.json({msg:error.message},{status:500})
    }
}