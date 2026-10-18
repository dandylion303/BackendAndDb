import Author from "./Author.js"
import authorRouter from "./authorRoutes.js"
import mongoose from 'mongoose';
import Post from "../posts/Post.js";

import bcrypt from 'bcryptjs'
import { sendEmail } from "../mail/serviceMail.js";


/* export async function getAuthorById(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.objectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid id' })
        }
        const author = await Author.findById(id)
        if (!author) {
            return res.status(404).json({ message: 'author not found' })
        }
        res.status(200).json({ id })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateAuthor(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.objectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid id' })
        }
        const updatedAuthor = await Author.findByIdAndUpdate(
            id,
            { nome, cognome, email, dob, avatar },
            { returnDocument: 'after' }
        )
        if (!updateAuthor) { return res.status(404).json({ message: 'Author not found' }) }
        res.status(200).json(updatedAuthor)
        const { nome, cognome, email, dob, avatar } = req.body



    } catch (error) {
        res.status(500).json({ message: error.message })
    }
} 
 */


//VERSIONE ESTESA
/* export const getAllAuthors = async (req, res, next) => {
    const { page, limit } = req.query
    const pageNumber = page ? Number(page) : 1
    const pageSize = limit ? Number(limit) : 20
    const skip = (pageNumber - 1) * pageSize

    try {
        const allAuthors = await Author.find()
            .skip(skip)
            .limit(pageSize)

        res.status(200).send(allAuthors)
    } catch (error) {
        next(error)
    }
} */

//VERSIONE COMPATTA
export const getAllAuthors = async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit

    try {
        const allAuthorsinPage = await Author
            .find()
            .skip(skip)
            .limit(limit)
        const allAuthorsinCollection = await Author.countDocuments()
        const totalPages = Math.ceil(allAuthorsinCollection / limit)

        res.status(200).json({
            page,
            limit,
            results: allAuthorsinPage,
            total: allAuthorsinCollection,
            totalPages,
        })

    } catch (error) {
        next(error)
    }
}


export const createAuthor = async (req, res, next) => {
    try {
        const { password, ...authorInfos } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newAuthor = await Author.create({ ...authorInfos, password: hashedPassword })
        
        await sendEmail(
            newAuthor.email, 
            'Benvenuto', 
            `<p>Ciao ${newAuthor.name}, la registrazione è andata a buon fine</p>`
        )
        res.status(201).send(newAuthor)
        


    } catch (error) {
        next(error)
    }
}


export const getAuthorById = async (req, res, next) => {
    try {
        const id = req.params.id
        const singleAuthor = await Author.findById(id)
        res.status(200).send(singleAuthor)

    } catch (error) {
        next(error)
    }
}


export const getAuthorPosts = async (req, res, next) => {
    try {
        const id = req.params.id
        const singleAuthor = await Author.findById(id)
        const posts = await Post.find({ author: singleAuthor.email })
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

export const updateAuthor = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = {...req.body}
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10)
        }
        const updatedAuthor = await Author.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        res.status(200).send(updatedAuthor)
    } catch (error) {
        next(error)
    }
}

export const deleteAuthor = async (req, res, next) => {
    try {
        const id = req.params.id
        const deletedAuthor = await Author.findByIdAndDelete(id)
        res.status(200).send('author deleted')

    } catch (error) {
        next(error)
    }
}

export const uploadAvatar = async (req, res, next) => {
    try {

        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400)
                .json({ message: 'invalid id' })

        }
        if (!req.file) {
            return res.status(400)
                .json({ message: 'file not uploaded' })
        }

        const author = await Author.findByIdAndUpdate(id, {
            avatar: req.file.path
        }, { returnDocument: 'after' })

        if (!author) {
            return res.status(404)
                .json({ message: 'author not found' })
        }

        res.status(200)
            .json(author)

    } catch (error) {
        next(error)
    }
}

