import mongoose from "mongoose";
import dotenv from "dotenv/config";
const MONGO_URI = process.env.MONGO_URI;

const connectDb = async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Mongo db has been upadted successfully");        
    } catch (error) {
        console.log("Unable to open");
        process.exit(1);      
    }
}
export default connectDb;