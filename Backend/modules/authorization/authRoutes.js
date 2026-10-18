import express from 'express'
import { login, whoIs, googleLogin } from './authController.js'
import { checkPassword } from '../../middlewares/checkPassword.js'
import passport from 'passport'


const authRouter = express.Router()
authRouter.post('/login', login)
authRouter.get('/me', checkPassword, whoIs)

authRouter.get('/auth/google', passport.authenticate(
    'google', {
    scope: ['profile', 'email'],
    session: false
}))
authRouter.get('/auth/google/callback', passport.authenticate('google', { session: false }),
googleLogin)

export default authRouter