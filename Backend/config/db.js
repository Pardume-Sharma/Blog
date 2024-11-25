import mongoose from "mongoose"
const MONGO_URL = "mongodb+srv://pardume:<db_password>@cluster0.t1b8o.mongodb.net/Blog"

export const connectDB = async()=>{
    await mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log('DB connected');
    })
}
