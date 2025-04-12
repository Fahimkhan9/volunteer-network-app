import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection
        connection.on("connected",()=>{
            console.log('mongodb connected successfully');
            
        })
    } catch (error) {
        console.log(error);
        
    }
}
export{
    connectDB
}