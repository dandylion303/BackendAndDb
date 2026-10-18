export const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(singleError => singleError.message)
        return res.status(400)
        .json({ 
            status: 'fail',
            message:'errore di validazione dei dati',
            errors: errors })
    }
    else if(error.name==='CastError'){
        return res.status(400)
        .json({
            status:'Invalid Id',
            message:  `Inserito ID non valido -  ${error.message}`

        })
    }

    else if(error.code===11000){
        return res.status(409)
        .json({
            status:'duplicated value',
            message: 'il dato deve essere univoco'
        })
    }

    else { res.status(500)
        .json({ 
            status: 'errore del server',
            message: error.message }) }
        }
