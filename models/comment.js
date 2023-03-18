import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    author:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    avatarUrl: String,
}, {
    timestamps: true
})

export default mongoose.model('Comment', CommentSchema)