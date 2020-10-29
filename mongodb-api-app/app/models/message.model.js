const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
    friendshipId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Friends'
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    seen: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
    });

const Message = model("Message", MessageSchema);

module.exports = Message;