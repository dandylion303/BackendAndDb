import {body, validationResult} from 'express-validator'

export const validateAuthor = [
    body('email')
        .trim()
        .notEmpty().withMessage('non può essere vuoto')
        .isEmail().withMessage('deve essere una mail')
]



//MIDDLEWARE
export const validation = (req, res, next)=>{
    const result = validationResult(req)

    if(!result.isEmpty()){
        return res.status(400).json({errors: result.array()})
    }
    next()
}