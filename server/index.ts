import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import cors from "cors";
import userRoute from "./Routes/userRoute";
import authRoute from "./Routes/authRoute";
import { InsertMessage } from "./Controllers/authController";

const app = express();

app.use(
  cors({
    exposedHeaders: "x-auth-token",
    origin: "https://effortless-gingersnap-cf79a0.netlify.app",
  })
);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://effortless-gingersnap-cf79a0.netlify.app",
    credentials: true,
  },
});

app.use(express.json());
app.use(userRoute);
app.use(authRoute);

io.on("connection", (socket: Socket) => {
  socket.on("join", (id) => {
    socket.join(id);
    socket.emit("Joined");
  });
  socket.on("send", (value) => {
    socket.broadcast.in(value[1]).emit("receive", value[0]);
    InsertMessage(value);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server Started At : " + process.env.PORT);
});
