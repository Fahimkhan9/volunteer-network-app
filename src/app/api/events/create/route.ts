import { Event } from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const {
            title,
            description,
            location,
            date,
            time,
            ownerId
        } = await req.json()
        if ([title,
            description,
            location,
            date,
            time,
            ownerId].some(i => i.trim() === '')) {
            return NextResponse.json({ msg: "All fields are required" })
        }
        const event=await Event.create({name:title,
            description,
            location,
            date,
            time,
            ownerId})
        
        return NextResponse.json({msg:'event created succesfully',data:event})
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

