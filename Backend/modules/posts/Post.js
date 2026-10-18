import mongoose from 'mongoose'
const {Schema, model} = mongoose

const blogPostSchema = new Schema({
    category: {
        type: String,
        enum:["technology", "relationships", "politics"]},
    title:{
        type: String, 
        required: [true, "needs title"]},
    cover:{
        type: String,
        default: 'https://t4.ftcdn.net/jpg/02/13/03/23/360_F_213032317_QtmN1YaNQOP5qyStrfAwJip1G2J1W6jn.jpg'
        },
    readTime:{
        value: {
            type: Number,
            default: '5'
        },
        unit: {
            type: String,
            enum:['min', 'sec'],
            default: 'sec'
        },
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type:String
    }

})

const Post = model('Post', blogPostSchema)
export default Post