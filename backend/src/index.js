import dotenv from "dotenv";
import connectDB from "./db/index.js";  
import { initSocket } from "./socket/index.js"
import {app} from './app.js'
import { createServer } from "http";

dotenv.config({ 
  path:'./.env'
 });



const server = createServer(app)
initSocket(server)


connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });




 








export { server }