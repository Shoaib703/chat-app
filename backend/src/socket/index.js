import { Server } from "socket.io"
import {socketAuthMiddleware} from "../middlewares/socketauth.middleware.js"
import{storemessage} from "./messagehandler.js"

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST"]
    }
  })

//   io.use(socketAuthMiddleware)

  io.on("connection", (socket) => {
    console.log(" SOCKET CONNECTED:", socket.id)
    
    socket.emit("test-event", "Hello from backend")

    
    socket.on("join-room",(data,)=>{
      socket.join(data.convo_id)
      socket.conversationid=data.convo_id
      console.log(data.convo_id)
      // console.log(`Socket ${socket.id} joined room ${data.conversationid}`); 
    })

    socket.on("send-message", async(data,conversationid,userId) => {
      socket.user={ _id:userId}
    const {mssg,sender}= await storemessage(data,socket);
    console.log(mssg)
    io.to(socket.conversationid).emit("newmsg",{mssg,sender});

      // console.log("Message from client:", data)
    })
  })



  return io
}