import express from 'express'
import { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor, uploadAvatar, getAuthorPosts } from './authorControllers.js'
import uploadImg from '../../middlewares/cloudinary.js'
import { validateAuthor, validation } from '../../middlewares/validators.js'
import { checkPassword } from '../../middlewares/checkPassword.js'

const authorRouter = express.Router()
authorRouter.get('/', checkPassword, getAllAuthors)
authorRouter.post('/', validateAuthor,validation, createAuthor)
authorRouter.get('/:id',checkPassword, getAuthorById)
authorRouter.get('/:id/blogPosts',checkPassword, getAuthorPosts)
authorRouter.put('/:id',checkPassword, updateAuthor)
authorRouter.delete('/:id',checkPassword, deleteAuthor)


authorRouter.patch('/:id/avatar',checkPassword, uploadImg.single('avatar'), uploadAvatar)

export default authorRouter
