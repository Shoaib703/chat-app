import {User} from "../models/user.models.js"
import {Conversation} from "../models/conversation.models.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadonCloudinary} from "../utils/cloudinary.js"
import { isValidObjectId } from "mongoose"
import {creategrp,
    start_pvtconversation,
    getconvo
}
from "../services/conversation.services.js"


const creategroup=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const {phone}=req.body
    const {group_name}=req.body

    const user=req.user?._id

    // console.log(user)
    
    if(!user){
        throw new ApiError(411,"user not available")
    }

    
    if(group_name.trim()===""){
        throw new ApiError(404,"group name can not be empty string")
    }

    const avatarpath=req.files?.avatar?.[0]?.path;
   

    // console.log(avatarpath)
    

   const group=await creategrp(email,phone,group_name,avatarpath,user)


    console.log(group)


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {name:group.groupMeta.name,
            admin:group.groupMeta.admin
            },
            "group is created"
        )
    )

})

const start_privateconversation=asyncHandler(async(req,res)=>{
    const {reciever_id}=req.body;

    // if(!isValidObjectId(reciever_id)){
    //     return res
    //     .status(400)
    //     .json(
    //         new ApiResponse(
    //             400,
    //             {},
    //             "not valid  reciever"
    //         )
    //     )
    // }
    // const checking=await User.findById(reciever_id)
    const checking =await User.findOne({
        email:reciever_id
    })
    console.log(checking);
    if(!checking){
        return res
        .status(404)
        .json(
            new ApiResponse(
                404,

                {},
                "user not found "
            )
        )
    }
    const user=req.user?._id;


    if(!user){
        throw new ApiError(400,"invalid user")
    }




    const pvtconversation=await start_pvtconversation(checking._id,user)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {pvtconversation},
            "the conversation stated"
        )
    )
})




const getmyconversation=asyncHandler(async(req,res)=>{
    const user=req.user?._id
    //   const page = Number(req.query.page) || 1
    //  const limit = Number(req.query.limit) || 10

    if(!user || !isValidObjectId(user)){
        throw new ApiError(407,"invalid userr")
    }

  const conversations=await getconvo(user)

    if(!conversations){
        return res.status(409)
        .json(
            new ApiResponse(
                409,
                {},
                "failed to fetch the conversations"
            )
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {conversations},
            "conversations fetched successfully"
        )
    )
})





export {
    creategroup,
    start_privateconversation,
    getmyconversation
}