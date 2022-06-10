const express = require('express')
const multer = require('express')
const router = express.Router()

const User = require('../model/userSchema')
const Feeds = require('../model/feedSchema')
const authentication = require('../middleware/auth')
const { feedFormValidation } = require('../middleware/validation-rule')
const { validationResult } = require('express-validator')

router.get('/', (req, res) => {
    res.send("Hello I am from feed.js")
})

router.post('/feedForm', authentication, feedFormValidation, async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({errorMessage: errors.array()})
        }
        const {personName, personEmail, personDOB, user} = req.body
        // if(!personName || !personAge || !personDOB || !user){
        //     return res.status(400).send("Hello! Seems like you didn't handle all required fields")
        // }
        // console.log("here")
        // const userName = user.username
        const userExists = await User.findOne({username : user})
        // console.log(userExists)
        // console.log("here1")
        console.log(userExists)
        if(!userExists){
            // console.log("here2")
            return res.status(400).send("Hello!. The user is not a valid User")
        }
        // const personDOB = new Date().toISOString()
        // console.log(date)
        // console.log(userExists._id)
        console.log(personDOB)
        // console.log("MMMEEEEE", new Date("1997/04/04"))
        const date = new Date(personDOB)
        date.setDate(date.getDate() + 1)
        console.log(date)
        const id = userExists._id
        const feed = new Feeds({user : userExists._id,personName, personEmail, personDOB:date})
        // console.log(feed)
        // console.log("here3")
        await feed.save()
        // console.log("here4")
        
        return res.status(200).send("Hello!, You have successfully added your feed")
    }catch(err){
        // console.log(err)
        console.log(err)
    }
})

router.get('/getFeedFormData/:username', authentication ,async (req, res) => {
    try{
        // const user = await Feeds.find()
        // console.log("Hello" , user[1].user)
        // const d = user[1].user
        const username = req.params.username
        const userData = await User.findOne({username})
        const userId =  userData._id
        const feedData = await Feeds.find({user: userId})
        return res.status(200).send({feeds: feedData})
    }catch(err){
        // console.log(err)
        return res.status(400).send(err)
    }
})

// const storage = multer.diskStorage({
//     destination(req, file, callback) {
//       callback(null, './images');
//     },
//     filename(req, file, callback) {
//       callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
//     },
//   });
  
//   const upload = multer({ storage });

// router.post('/imageUpload', authentication, upload.single('photo', 3), async (req, res) => {

//     res.status(200).send("Added image");
// })

module.exports = router