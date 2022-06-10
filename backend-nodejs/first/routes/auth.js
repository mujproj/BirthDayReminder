const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')
const { form } = require('../middleware/validation-rule')
const { validationResult } = require('express-validator')

router.get('/', (req, res) => {
    res.send("Hello I am in router.js ")
})

router.post('/register', form, async (req, res) => {
    try{
        const errors = validationResult(req)
        if(errors.isEmpty()){
            const {email, firstName, lastName, mobileNumber, username, password} = req.body

            // if(!firstName || !lastName || !mobileNumber || !email || !password || !username){
            //     return res.status(422).send("Hello!,  Seems like you didn't entered all the required fields")
            // }

            const userEmailExists = await User.findOne({email})
            if(userEmailExists){
                return res.status(400).send("Hello!, The email you are trying to register actually already exists, You can proceed to login")
            }

            const userUsernameExists = await User.findOne({username})
            if(userUsernameExists){
                return res.status(400).send("Hello!, The username you are trying to set is already used by someone. Please try a different username")
            }

            // if(userExists){
            //     res.status(422).send("Hello!, the username you are trying to use actually already exists")
            // }

            // 
            const hashPassword = async (password, saltRounds = 10) => {
                try {
                    // Generate a salt
                    const salt = await bcrypt.genSalt(saltRounds);
            
                    // Hash password
                    return await bcrypt.hash(password, salt);
                } catch (error) {
                    console.log(error);
                }
            
                // Return null if error
                return null;
            };

            const bcryptPass = await hashPassword(password)
            
            const user = new User({email, firstName, lastName, mobileNumber, username, password: bcryptPass})

            await user.save()

            return res.status(200).send("Hello! You have successfully registered")
        }
        else{
            const errorArray = errors.array()
            return res.status(400).send(errorArray)
        }
        
    }catch(err) {
        return res.status(400).send(err)
    }
})

router.post('/login',form, async (req, res) => {
    try{
        console.log("Hello I am in node js")
        const errors = validationResult(req)
        
        const {username, password} =  req.body
        if(!username || !password){
            return res.status(400).send("Looks Like you didn't entered all the required feilds")
        }
        const userExists = await User.findOne({username})
        console.log(">?>?", userExists)
        let passwordValid
        if(userExists){
            passwordValid = await bcrypt.compare(password, userExists.password)
        }
        
        // console.log(userExists.password)
        if(!userExists || !passwordValid){
            return res.status(400).send("Hello! Can't find matching credentials")
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: userExists._id
        }
    
        const token = jwt.sign(data, jwtSecretKey, {expiresIn: '1d'});
  
        return res.status(200).send({token:token});
        // return res.status(422).send("Hello! You have successfully Logged in")
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
})

router.get('/logout',  (req, res) => {
    
    res.status(200).send("You have Successfully Logged out")
})

module.exports = router