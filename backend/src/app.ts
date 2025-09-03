import express, { Request, Response } from "express";
import dbConnection from "./db/db"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import userRouters from "./routers/userRouters"
import noteRoutes from './routers/noteRouters'

const app = express();
const PORT = 4000;

dbConnection()
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/v1/user", userRouters);
app.use("/api/v1/note", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
