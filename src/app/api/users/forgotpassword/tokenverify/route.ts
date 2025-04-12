import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, password } = reqBody
        console.log({token,password});
        
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordExpiry:{$gt:Date.now()}
        }
        )
        // console.log(user);
        
        if (!user) {
            return NextResponse.json({ msg: "Invalid credentials" })
        }
        await User.findByIdAndUpdate(user._id, {
            password,
            forgotPasswordToken:undefined,
            forgotPasswordExpiry:undefined
        })
        return NextResponse.json({ message: 'password updated successfully', success: true })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}