import mongoose from "mongoose"

// mongodb+srv://linkinpardume07:uLaR2P2udFEWDua2@cluster0.ktabq.mongodb.net/

const MONGO_URL = 'mongodb+srv://pardume:FzmUmaWmBuaY3E9v@cluster0.t1b8o.mongodb.net/'
const DB_NAME = 'YummyBites'

export const connectDB = async()=>{
    await mongoose.connect(MONGO_URL+DB_NAME)
    .then(()=>{
        console.log('DB connected');
    })
}
// mongodb+srv://pardume:<db_password>@cluster0.t1b8o.mongodb.net/