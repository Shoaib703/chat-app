import { Server } from "socket.io"
import {socketAuthMiddleware} from "../middlewares/socketauth.middleware.js"
import{storemessage} from "./messagehandler.js"

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://127.0.0.1:3000",
      methods: ["GET", "POST"]
    }
  })

//   io.use(socketAuthMiddleware)

  io.on("connection", (socket) => {
    console.log(" SOCKET CONNECTED:", socket.id)
    
    socket.emit("test-event", "Hello from backend")

    
    socket.on("join-room",(data,)=>{
      socket.join(data.conversationid)
      socket.conversationid=data.conversationid
      // console.log(`Socket ${socket.id} joined room ${data.conversationid}`); 
    })

    socket.on("send-message", async(data,conversationid,userId) => {
      socket.user={ _id:userId}
    const mssg= await storemessage(data,socket);
  //      console.log("User:", userId);          
  // console.log("Room:", socket.conversationid); 
    io.to(socket.conversationid).emit("newmsg",(mssg));

      // console.log("Message from client:", data)
    })
  })



  return io
}