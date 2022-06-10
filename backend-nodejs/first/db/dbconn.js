const mongoose = require('mongoose')

const db = process.env.DATABASE

const connectionParams={
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true 
}

const connection = async () => {
    try{
        const data = await mongoose.connect(db,connectionParams)
        console.log("Connection Successfull")
    }catch(err){
        console.log(err)
    }
}

connection()