import { trusted } from 'mongoose'
import Comment from './Comment.js'

export const addComment = async (req, res, next)=>{
    try {
        const post = req.params.id
        const newComment = await Comment.create({...req.body, post: post})
        res.status(201).json(newComment)
    } catch (error) {
        next(error)
        
    }
}

export const getComments = async (req, res, next)=>{
    try {
        const postId = req.params.id
        const comments = await Comment.find({post: postId})
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}

export const getSingleComment = async (req, res, next)=>{
    try {
        const postId = req.params.id
        const commentId= req.params.commentId
        const comment = await Comment.findOne({_id:commentId, post: postId})
    } catch (error) {
        next(error)
    }
}

export const changeComment = async ( req, res, next)=>{
    try {
        const postId= req.params.id
        const commentId= req.params.commentId
        const {review} = req.body
        const updatedComment = await Comment.findOneAndUpdate(
            {_id: commentId, post: postId, },
            {review},
            {new:true, runValidators:true}
        )
        
        res.status(200).json(updatedComment)
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) =>{
    try {
        const commentId= req.params.commentId
        const postId= req.params.id
        const deletedComment = await Comment.findOneAndDelete({_id:commentId, post: postId })
        res.status(200).json({message: 'Commento cancellato'})
        
    } catch (error) {
        next(error)
    }
}