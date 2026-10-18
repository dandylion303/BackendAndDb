import jwt from 'jsonwebtoken'

export const checkPassword = (req, res, next)=>{
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer')){
        return res.status(401).json({message: 'Accesso non autorizzato'})
    }
    const token = header.split(' ')[1]


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.authorId = decoded.authorId
         next()
    } catch (error) {
        return res.status(401).json({message: 'Accesso non autorizzato'})
        
    }
}




/* 
export const isAuthorized = (req, res, next) => {
    const { apikey } = req.query
    if ( apikey !== '1234'){
        return res.status(401).send({
            message: 'Unauthorized'
        })
    }
next()
}
 */



