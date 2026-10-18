import 'dotenv/config'
import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import Author from '../author/Author.js'

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done)=>{
            try {
                const email = profile.emails[0].value
                let author = await Author.findOne({email})

                if(!author){
                    author = await Author.create({
                        name: profile.displayName, 
                        email, 
                        googleId: profile.id,
                    })
                }
                
                return done (null, author)


            } catch (error) {
                return done (error)
            }
        }
    )
)