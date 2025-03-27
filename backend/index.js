import express from "express";
import multer from "multer";
// import Grid from "gridfs-stream";
// import GridFsStorage from "multer-gridfs-storage";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./connect/connectDB.js";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import { Server } from "socket.io";
import http from "http";

dotenv.config();
const app = express();
//middlewares
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//runs the server
const PORT = process.env.PORT || 9000;
connectDB();

const server = http.createServer(app);
const io=new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:['GET','POST']
  }
})
//routes
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
// const storage = new GridFsStorage({
//   url:process.env.MONGO_URI,
//   file:(req,file)=>{
//     return neww
//   }

// })