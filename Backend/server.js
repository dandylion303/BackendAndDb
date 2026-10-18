import express from 'express'
const PORT = process.env.PORT || 4444
import startServer from './config/db.js'
import authorRouter from './modules/author/authorRoutes.js'
import postRouter from './modules/posts/postRoutes.js'
import cors from 'cors'
import { logger } from './middlewares/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
//import { isAuthorized } from './middlewares/isAuthorized.js'
//import path from 'node:path' 
import authRouter from './modules/authorization/authRoutes.js'
import { checkPassword } from './middlewares/checkPassword.js'

import './modules/authorization/oauthGoogle.js'

const server = express()
server.use(express.json())
server.use(cors())
server.use(logger)
//server.use(isAuthorized)


//routes
server.use('/authors', authorRouter)
server.use('/posts', checkPassword, postRouter)

//login
server.use('/', authRouter)

//error handlers middleware
server.use(errorHandler)


startServer(PORT, server)
