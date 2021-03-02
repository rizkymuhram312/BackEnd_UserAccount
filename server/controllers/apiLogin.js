const bcrypt = require('bcrypt');
const { default: users } = require('../models/users.model');
const salt = 10;
const checkLoginMethod = async (req,res) => {
const {user_name,user_password} = req.body

const LoginMethod = bcrypt.compare(user_password, users.user_password, function(err,res){
    if (err){
        return res.status(404)
    }
    if (res){
        return res.status(200)
    }
})
const users = await req.context.models.users.findByPk(user_name,LoginMethod)
}

export default{
    checkLoginMethod
}