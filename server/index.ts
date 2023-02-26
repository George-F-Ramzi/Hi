import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import userRoute from "./Routes/userRoute";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(userRoute);

io.on("connection", (socket) => {});

server.listen(process.env.PORT, () => {
  console.log("Server Started At : " + process.env.PORT);
});
