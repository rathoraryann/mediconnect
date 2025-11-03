import mongoose from 'mongoose'

const connDB = async()=>{
    await mongoose.connect(`${process.env.MONGODB_URI}/mediconnect`)
    console.log('connected')
}

export default connDB;