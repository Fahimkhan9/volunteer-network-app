import { connectDB } from "@/dbConfig/dbConfig";
import { Event } from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'
import path from "path";
import { writeFile } from "fs/promises";
import fs from 'fs'
connectDB()
export async function POST(req: NextRequest) {
    try {
        // const {
        //     title,
        //     description,
        //     location,
        //     date,
        //     time,
        //     ownerId,
        //     owneremail,

        // } = await req.json()
        const formData = await req.formData()
        const title = formData.get('title')
        const description = formData.get('description')
        const location = formData.get('location')
        const time = formData.get('time')
        const date = formData.get('date')
        const image = formData.get('image')
        const owneremail = formData.get('owneremail')
        const ownerId = formData.get('ownerId')
       

        // if ([title,
        //     description,
        //     location,
        //     date,
        //     time,
        //     ownerId,owneremail,image].some(i => i.trim() === '')) {
        //     return NextResponse.json({ msg: "All fields are required" })
        // }
        if (!image) {
            throw new Error("Image is required");
        }
        if (!(image instanceof File)) {
            throw new Error("Invalid image file");
        }
        const buffer = Buffer.from(await image.arrayBuffer());
        const filename = Date.now() + image.name.replaceAll(" ", "_");
      

        const resfile = await writeFile(
            path.join(process.cwd(), "public/uploads/" + filename),
            buffer
        );
      



        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        

        const res = await cloudinary.uploader.upload(`${process.cwd()}/public/uploads/${filename}`,{transformation:[
            {width: 300, crop: "scale"},
            {height: 300, crop: "scale"}
        ]})
       

        const event = await Event.create({
            name: title,
            description,
            location,
            date,
            time,
            ownerId,
            image: res.url,
            owneremail
        })
        fs.unlinkSync(`${process.cwd()}/public/uploads/${filename}`)

        return NextResponse.json({ msg: 'event created succesfully', data: event })

    } catch (error: any) {
       
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

