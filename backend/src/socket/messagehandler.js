import { Message } from "../models/message.models.js";
import {Conversation} from "../models/conversation.models.js"
const storemessage=async( data ,socket)=>{
    const user=socket.user._id
    const conversationid=socket.conversationid
    const abc=data
    const convo=await Conversation.findById(conversationid)

    const msg=await Message.create({
       conversationId: conversationid,
         message:abc,
         type:"text",
        sender:user,
        reciever:convo.participants
    });

    return {mssg:msg.message,sender:msg.sender};
}


export {
    storemessage
}