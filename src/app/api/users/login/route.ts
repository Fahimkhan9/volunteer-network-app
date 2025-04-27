import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        if ([email, password].some(i => i.trim() === '')) {
            return NextResponse.json({ msg: "All fields are required" })
        }
        const user = await User.findOne({ email })
        
        
        if (!user) {
            return NextResponse.json({ msg: "Invalid credentials" },{status:400})
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({msg: "Invalid password"}, {status: 400})
        }
      
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({ msg: error.message }, { status: 500 })
    }
}