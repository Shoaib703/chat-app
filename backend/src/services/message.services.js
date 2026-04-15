import {Message } from "../models/message.models.js"
import mongoose from "mongoose"
const getmsg=async(conversationid,page,limit)=>{
    const offset=(page-1)*limit;
    const messages=await Message.aggregate([
        {
            $match:{
                conversationId:new mongoose.Types.ObjectId(conversationid)
            }
        },
        {
            $skip:offset
        },
        {
            $limit:limit
        },
        {
            $sort:{
                createdAt:1
            }
        }
    ])
    return messages;
}

export{
    getmsg
}