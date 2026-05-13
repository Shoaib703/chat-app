import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js";
import cookie from "cookie";

export const socketAuthMiddleware = async (socket, next) => {
  try {




    const cookies = cookie.parse(socket.handshake.headers.cookie || "");

    const token = cookies.accessToken;

    if (!token) {
      return next(new Error("Authentication error: No token"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    socket.user = user;

    next();

  } catch (error) {
    next(new Error("Authentication error: Invalid token"));
  }
};