const jwt = require('jsonwebtoken')

const authentication = async(req, res, next) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const token = req.header(tokenHeaderKey);
        if(token == null)
            return res.status(400).send("Oops!.  Looks LIke you missed one or more request header")
        const verified = await jwt.verify(token, jwtSecretKey);
        if(verified){
            next()
        }else{
            // Access Denied
            return res.status(401).send("Could not authenticate properly");
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
// await jwt.verify()
}

module.exports = authentication