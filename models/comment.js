import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    avatarUrl: String,
}, {
    timestamps: true
})

export default mongoose.model('Comment', CommentSchema)