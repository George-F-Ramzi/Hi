import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import cors from "cors";
import userRoute from "./Routes/userRoute";
import authRoute from "./Routes/authRoute";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors({ exposedHeaders: "x-auth-token" }));
app.use(express.json());
app.use(userRoute);
app.use(authRoute);

io.on("connection", (socket: Socket) => {
  socket.on("ID", (id) => {
    socket.join(id);
    socket.on("receive", (message) => {
      console.log(message);
    });
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server Started At : " + process.env.PORT);
});
