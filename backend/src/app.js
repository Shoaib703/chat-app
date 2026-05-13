import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import {Server} from "socket.io"

const app=express()
const server=http.createServer(app)

// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true
// }))


const allowedOrigins = process.env.CORS_ORIGIN?.split(',');

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
}));



app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"

import conversationRouter from "./routes/conversation.routes.js"

import messageRouter from "./routes/message.routes.js"


app.use("/api/v2/users",userRouter)
app.use("/api/v2/conversations",conversationRouter)
app.use("/api/v2/messages",messageRouter)




app.use((err, req, res, next) => {
    console.error("ERROR:", err);

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong",
    });
});





export { server,app} 