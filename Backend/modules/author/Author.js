import mongoose from 'mongoose'
const { Schema, model } = mongoose


const authorSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Inserisci il tuo nome"]
    },
    lastname: {
        type: String,
        trim: true,
    },
    birthDate: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "L'email è obbligatoria"],
        unique: true,
    },
    password: {
        type: String,
        required: [function(){return !this.googleId}, 'La password è obbligatoria'],
        select: false,
    },
    avatar: {
        type: String,
        default: 'https://i.pravatar.cc/100',
    },
    googleId:{
        type:String,
    }
},

    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password; //non invia la chiave dell'oggetto
                return ret; //invia solo il ret
            },

        },
    })

const Author = model('Author', authorSchema)
export default Author