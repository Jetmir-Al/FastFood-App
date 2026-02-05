import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
    origin: process.env.CLIENT_PORT,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


