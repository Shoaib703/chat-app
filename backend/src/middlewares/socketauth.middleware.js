import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {

 console.log("MIDDLEWARE HIT")
    console.log("token:", socket.handshake.auth?.token)

    // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
// const user = await User.findById(decoded.id) // ❌ decoded.id is undefined!
// token has _id not id


    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication error: No token"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    // console.log(user)
    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    socket.user = user;

    next();

  } catch (error) {
    next(new Error("Authentication error: Invalid token"));
  }
};