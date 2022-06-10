const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'REGISTRATION'},
    personName : {
        type: String,
        required: true
    },
    personEmail : {
        type: String,
        required: true
    },
    personDOB : {
        type: Date,
        required: true
    }
})

const Feeds = new mongoose.model("FEED", feedSchema)

module.exports = Feeds