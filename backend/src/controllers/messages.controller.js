import {User} from "../models/user.models.js"
import { Conversation } from "../models/conversation.models.js"
import { Message} from "../models/message.models.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import mongoose,{isValidObjectId} from "mongoose"
// require('mongoose-paginate-v2');
import{ getmsg } from "../services/message.services.js"
const getmessages=asyncHandler(async(req,res)=>{
    const {conversation_id}=req.params
  
    if(!conversation_id || !isValidObjectId(conversation_id)){
        return res 
        .status(410)
        .json(
            new ApiResponse(
                410,
                {},
                "invalid conversation id"
            )
        )
    }
    const check=await Conversation.findById(conversation_id)
    if(!check){
        return res
        .status(404)
        .json(
            new ApiResponse(
                404,{}
                ,"conversation not found"
            )
        )
    }
    const {page=1,limit=20}=req.query

    // page=page||1;
    // limit=limit||20; 
    
    const messages=await getmsg(conversation_id,page,limit)
    
    if(!messages){
        throw new ApiError(
            411,"failed to fetch the messages"
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {messages},
            "messages fetched successfully"
        )
    )
})


export{
    getmessages
}