import {User} from "../models/user.models.js"
import {Conversation} from "../models/conversation.models.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadonCloudinary} from "../utils/cloudinary.js"
import { isValidObjectId } from "mongoose"




const creategrp=async(email,phone,group_name,avatarpath,user)=>{
    const arr=[];
    
    for(const e of email){
        if(e.trim()===""){
            continue;
        }

        const check= await User.findOne({
            email:e
        }).select("_id")

        if(check){
            arr.push(check._id);
        }

    }

    for( const p of phone){
        if(p.trim()===""){
           continue;
        }

        const check= await User.findOne({
            phone:p
        }).select("_id")

        if(check){
            arr.push(check._id)
        }

    }
    let avatar;
    if(avatarpath){
           
        
         avatar=await uploadonCloudinary(avatarpath)
        if(!avatar){
            throw new ApiError(403,"avatar failed to be uploaded")
        }
    
    }
    arr.push(user)
    const group=await Conversation.create({
        type:"group",
        participants:arr,
        groupMeta:{
        admin:user,
        name:group_name,
        avatar:avatar.url||""
        }

    })
    return group;

}


const start_pvtconversation=async(recieverid,senderid)=>{

    const check=await Conversation.findOne(
       {
        type:"private",
        participants:{$all:[senderid,recieverid]}
        ,
        $expr:{
            $eq:[{$size:"$participants"},2]
        }
})

if(check){
    return check;
}

 const pvtconversation=await Conversation.create({
        type:"private",
        participants:[senderid,recieverid]
    })

    return pvtconversation;

}


const getconvo=async(user)=>{

    const conversations = await Conversation.find({ participants:user }).populate('participants','username')
  .sort({ updatedAt: -1 });


    return conversations

}

export{
    creategrp,
    start_pvtconversation,
    getconvo
}