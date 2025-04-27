import { connectDB } from "@/dbConfig/dbConfig"
import { Event } from "@/models/eventModel"
import { User } from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

connectDB()
export async function POST(req:NextRequest){
    try {
        const {id,userid}=await req.json()
        
        
        const res=await User.findByIdAndUpdate(userid,{
            $pull:{
                event:{
                    _id:id
                }
            }
        },{new:true})
        const eventres=await Event.findByIdAndUpdate(id,{
            $pull:{
                participants:{
                    id:userid
                }
            }
        })
       
        return NextResponse.json({data:res})
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}