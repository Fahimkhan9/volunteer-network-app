import { connectDB } from "@/dbConfig/dbConfig"
import { Event } from "@/models/eventModel"
import { User } from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

connectDB()
export async function POST(req:NextRequest){
    try {
        const {eventId,userId}=await req.json()
        if([eventId,userId].some(i=>i.trim()==='')){
            return NextResponse.json({error:'All fields are required'})

        }
        const user=await User.findById(userId)
        // this will show the event owner how many people participated
        const findevent=await Event.findByIdAndUpdate(eventId,{
            $push:{
                participants:{
                    id:user._id,
                    email:user.email,
                    username:user.username
                }
            }
        },{new:true})
        // this show to the participants how many events they have registered for
        await User.findByIdAndUpdate(userId,{
            $push:{
               event:{
                id:findevent._id,
                name:findevent.name,
                description:findevent.description,
                location:findevent.location,
                date:findevent.date,
                time:findevent.time
               }
            }
        },{new:true})
        return NextResponse.json({data:findevent})
      
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}