import { Event } from "@/models/eventModel"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req:NextRequest){
    try {
        const {ownerId}=await req.json()
        console.log(ownerId);
        
        const res=await Event.find({ownerId})
        return NextResponse.json({data:res})
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}