import express from "express";
import cors from "cors";
import 'dotenv/config.js';
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import blogRouter from "./routes/blogRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB(); 

// api endpoints
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
