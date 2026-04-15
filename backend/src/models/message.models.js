
import mongoose,{Schema} from "mongoose"


const messageSchema=new Schema({
    conversationId:{
        type:Schema.Types.ObjectId,
        ref:"Converssation"
    },
    message:{
        type:String,
        maxLength:800,
        trim:true,
    },
    type:{
        type:String,
        enum:["text","audio","image","video"],
        default:"text"

    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    reciever:{
        type:[Schema.Types.ObjectId],
        ref:"User"
    }
}
,{
    timestamps:true
})

export const Message=mongoose.model("Message",messageSchema)