import { connectDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ msg: 'Invalid email' })
        }
        
        await sendEmail({email,emailType:"RESET",userId:user._id})
        return NextResponse.json({message:'forgotpassword email sent',success:true})
    } catch (error:any) {
        console.log(error);

    }
}