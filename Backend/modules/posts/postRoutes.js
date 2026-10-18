import express from 'express'
import { getAllPosts, getSinglePost,createPost,updatePost,deletePost, uploadCoverImg } from './postController.js'
import uploadImg from '../../middlewares/cloudinary.js'
import { addComment, changeComment, deleteComment, getComments, getSingleComment } from '../comments/commentController.js'

const postRouter = express.Router()


postRouter.get('/',getAllPosts)
postRouter.get('/:id', getSinglePost)
postRouter.post('/', uploadImg.single('cover'), createPost)
postRouter.put('/:id', updatePost)
postRouter.delete('/:id',deletePost)


//GESTIONE IMMAGINI NELLA COVER
postRouter.patch('/:id/cover', uploadImg.single('cover'), uploadCoverImg)


//COMMENTI - REVIEWS
postRouter.post('/:id/comments', addComment)
postRouter.get('/:id/comments', getComments)
postRouter.get('/:id/comments/:commentId', getSingleComment)
postRouter.put('/:id/comments/:commentId', changeComment)
postRouter.delete('/:id/comments/:commentId', deleteComment)


export default postRouter