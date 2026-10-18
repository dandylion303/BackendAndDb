import 'dotenv/config'
import mongoose from 'mongoose';
const databaseConnectionString = process.env.MONGO_URL

const initDataBaseConnection = async() =>{
    try {
        await mongoose.connect(databaseConnectionString)
        console.log('database connected successfully')
        
    } catch (error) {
        console.error('Not connected to database', error)
        process.exit(1)
    }
}

const startServer = async(port, server) =>{
    await initDataBaseConnection()
    server.listen(port, ()=>{
        console.log(`server up and running on port ${port}`)
    })
}

export default startServer