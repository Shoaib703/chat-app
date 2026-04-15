import mongoose,{Schema} from "mongoose"
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const conversationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["private", "group"],
      required: true
    },

    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],

    groupMeta: {
      name: {
        type: String,
        trim: true
      },
      admin: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      ],
      avatar: {
        type: String
      }
    },

    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message"
    }
  },
  {
    timestamps: true
  }
);

export const Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);
