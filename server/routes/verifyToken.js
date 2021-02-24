const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth')
    if(!token) return res.status(400).json({
            status : res.statusCode,
            message: 'Access Denied !'
        })
    try {
        const verified = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)
        req.users = verified
        next()

    }catch(err){
        res.status(400).json({
            status : res.statusCode,
            message: 'invalid token !'
        })
    }
}
module.exports = verifyToken