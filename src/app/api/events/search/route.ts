import { Event } from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const {
            title,
            
        } = await req.json()
        if ([title].some(i => i.trim() === '')) {
            return NextResponse.json({ msg: "All fields are required" })
        }
        const event=await Event.find({name:title})
        
        return NextResponse.json({data:event})
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

