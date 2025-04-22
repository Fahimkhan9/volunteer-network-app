import { Event } from "@/models/eventModel"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req:NextRequest){
    try {
        const res=await Event.find()
        return NextResponse.json({data:res})
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}