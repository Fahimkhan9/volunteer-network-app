import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, password } = reqBody
        
        
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordExpiry:{$gt:Date.now()}
        }
        )
        
        if (!user) {
            return NextResponse.json({ msg: "Invalid credentials" })
        }
        const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
        await User.findByIdAndUpdate(user._id, {
            password:hashedPassword,
            forgotPasswordToken:undefined,
            forgotPasswordExpiry:undefined
        })
        return NextResponse.json({ message: 'password updated successfully', success: true })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}