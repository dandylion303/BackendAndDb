import bcrypt from "bcryptjs"
import Author from "../author/Author.js"
import jwt from 'jsonwebtoken'


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const author = await Author.findOne({ email }).select('+password')
        if (!author) {
            return res.status(401).json({ message: 'credenziali non valide' })
        }
        const isValid = await bcrypt.compare(password, author.password)
        if (!isValid) {
            return res.status(401).json({ message: 'credenziali non valide' })
        }
        const token = jwt.sign(
            { authorId: author._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(200).json({ token })
    } catch (error) {
        next(error)

    }
}


//PER TROVARE L'UTENTE A PARTIRE DAL TOKEN
export const whoIs = async (req, res, next) => {
    try {
        const author = await Author.findById(req.authorId)
        res.status(200).json(author)
    } catch (error) {
        next(error)

    }
}


//PER GOOGLE OAUTH
export const googleLogin = (req, res) => {
  const token = jwt.sign(
    { authorId: req.user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
  res.redirect(`${process.env.SITE_URL}/oauth?token=${token}`)
}