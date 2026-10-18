import { findAllPosts, findSinglePost, createNewPost, updateExistingPost, deleteExistingPost } from "./postService.js";
import { sendEmail } from "../mail/serviceMail.js";
import Author from '../author/Author.js'

export const getAllPosts = async (req, res, next) => {
    const { title } = req.query
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit
    try {

        const { posts, totalPosts } = await findAllPosts(title, skip, limit)
        const totalPages = Math.ceil(totalPosts / limit)
        res.status(200).json({
            page,
            limit,
            results: posts,
            totalPages,
            total: totalPosts
        })
    } catch (error) {
        next(error)
    }
}

export const getSinglePost = async (req, res, next) => {
    try {
        const id = req.params.id
        const singlePost = await findSinglePost(id)
        res.status(200).send(singlePost)
    } catch (error) {
        next(error)

    }
}

export const createPost = async (req, res, next) => {
    try {
        const currentAuthor = await Author.findById(req.authorId)
        const baseData = { ...req.body, author: currentAuthor.email }
        const postData = req.file
            ? { ...baseData, cover: req.file.path }
            : baseData

        const newPost = await createNewPost(postData)
        await sendEmail(
            newPost.author,
            'Post pubblicato',
            `<p>Ciao, il tuo post ${newPost.title} è live sul sito</p>`
        )
        res.status(201).json(newPost)
    } catch (error) {
        next(error)

    }
}

export const updatePost = async (req, res, next) => {
    try {
        const id = req.params.id
        const { category, title, cover, readTime, author, content } = req.body
        const updatedPost = await updateExistingPost(
            id,
            { category, title, cover, readTime, author, content },
            { new: true, runValidators: true })
        res.status(200).send(updatedPost)
    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id
        const deletedPost = await deleteExistingPost(id)
        res.status(200).send('post deleted')
    } catch (error) {
        next(error)
    }
}

/* COPIATO A LEZIONE

export const uploadcoverOnDisk = async (req, res, next) => {
    try {
        const url = `${req.protocol}://${req.get('host')}`
        const imageName = req.file.filename

        res.status(200)
            .json({ cover: `${url}/uploads/${imageName}` })

    } catch (error) {
        next(error)

    }
} */

export const uploadCoverImg = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedPostWithCover = await updateExistingPost(id, { cover: req.file.path }, { new: true, runValidators: true })
        res.status(200).json(updatedPostWithCover)

    } catch (error) {
        next(error)

    }
}