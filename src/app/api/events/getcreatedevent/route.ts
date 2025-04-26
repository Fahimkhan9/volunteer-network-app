import { connectDB } from "@/dbConfig/dbConfig"
import { Event } from "@/models/eventModel"
import { NextRequest, NextResponse } from "next/server"

connectDB()
export async function POST(req:NextRequest){
    try {
        const {ownerId}=await req.json()
        
        
        const res=await Event.find({ownerId})
        return NextResponse.json({data:res})
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}