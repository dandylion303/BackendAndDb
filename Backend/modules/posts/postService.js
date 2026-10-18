import Post from "./Post.js"
import { getAllPosts } from "./postController.js"

export const findAllPosts = async (title, skip, limit)=>{
    const filter = {}
    if(title){
        filter.title = {$regex: title, $options:'i'} // $options: 'i' rende la ricerca case-insensitive
    }
    const totalPosts = await Post.countDocuments(filter)
    const  posts = await Post
        .find(filter)
        .skip(skip)
        .limit(limit)

    return {posts, totalPosts}
    
}

export const findSinglePost = async (id)=>{
    return await Post.findById(id)
}

export const createNewPost = async (body)=>{
    return await Post.create(body)
}

export const updateExistingPost = async (id, body, conditions)=>{
    return await Post.findByIdAndUpdate(id, body, conditions)
}

export const deleteExistingPost = async (id)=>{
    return await Post.findByIdAndDelete(id)
}