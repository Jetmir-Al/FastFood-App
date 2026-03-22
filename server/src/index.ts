import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import AuthRoutes from "./routes/auth.routes";
import DeliveryRoutes from "./routes/delivery.routes";
import OrderRoutes from "./routes/order.routes";
import FoodRoutes from "./routes/food.routes";

const app = express();
const corsOptions = {
    origin: process.env.CLIENT_PORT,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
    "/images",
    express.static(path.join(__dirname, "public/images"))
);


if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

app.use("/api/auth", AuthRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/delivery", DeliveryRoutes);
app.use("/api/food", FoodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));


