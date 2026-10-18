import mongoose from 'mongoose'
const { Schema, model } = mongoose

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    author:{
        type: String, 
    },

    review: {
        type: String,
        required: true
    },

},
    { timestamps: true })


const Comment = model('Comment', CommentSchema)
export default Comment