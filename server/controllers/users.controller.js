import { Router } from 'express';
import { sequelize, Op } from '../models/index';
import AuthHelper from '../helpers/AuthHelper'
import config from '../../config/config'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'





// create user with hash & salt
const signup = async (req, res) => {
  //const { user_name, user_email, user_password } = req.body;

  const { dataValues } = new req.context.models.users(req.body);


  const emailUser = await req.context.models.users.findOne( { where: { user_email: dataValues.user_email }  } )

  if (emailUser) {
    return res.status(404).json({
      status : false,
      message : 'email sudah terdaftar, silakan login'
    })
  }


  const salt = AuthHelper.makeSalt();
  const hashPassword = AuthHelper.hashPassword(dataValues.user_password, salt);
  const hashDevice = AuthHelper.hashPassword(dataValues.user_device_info, salt);


  const users = await req.context.models.users.create({
    user_name: dataValues.user_name,
    user_email: dataValues.user_email,
    user_password: hashPassword,
    user_device_info: hashDevice,
    user_salt: salt
  });

  return res.status('201').json({
    message : "user berhasil didaftarkan",
    data : users
  })
}



//filter pencarian data dengan primary key
const readAllUser = async (req, res) => {
    const users = await req.context.models.users.findAll();
    return res.send(users);
  };





// filter find by user_email
const signin = async (req, res) => {
  //1. extract values from request body
  const { user_email, user_password } = req.body
  
  //2. gunakan try catch, agar jika terjadi error misal table ga bisa diakses bisa munculkan error message
  try {

    // idem : select * from users where user_email = :user_email
    const datauser = await req.context.models.users.findOne({
      where: { user_email: user_email }
    });
    // console.log(datauser)

    //3. jika user tidak ketemu munculkan error
    if (!datauser) {
      return res.status('400').json({
        status : false,
        error: "User belum terdaftar"
      });
    }

    //3. check apakah user_password di table === user_passowrd yg di entry dari body,
    // tambahkan salt
    if (!AuthHelper.authenticate(user_password, datauser.dataValues.user_password, datauser.dataValues.user_salt)) {
      return res.status('401').json({
        status : false,
        error: "Password salah"

      })
    }




     //4. generate token jwt, jangan lupa tambahkan jwtSecret value di file config.js
     const token = jwt.sign({ _id: datauser.user_id}, config.jwtSecret)

     //5. set expire cookie
     res.cookie("t", token, {
       expire: new Date() + 9999
     })
 
     //6. exclude value user_password & user_salt, agar tidak tampil di front-end
     // lalu send dengan include token, it's done
     return res.json({token,datauser: {
       user_id : datauser.dataValues.user_id,
       user_name : datauser.dataValues.user_name,
       user_email : datauser.dataValues.user_email
     }});
 
 
   } catch (err) {
     return res.status('400').json({
      status : false,
       error: "tidak dapat mendapatkan data user",
       data : users

     });
   }
 
 }


// findAll = select * from users
const findUsersMethod = async (req, res) => {
  const user = await req.context.models.users.findOne( {_id : req.id, attributes : {exclude : [ 'user_password', 'user_salt']}}  );
  return res.status(200).json({
    message : 'berhasil dipanggil',
    data: user 
  })
}


 
 const signout = (req, res) => {
   res.clearCookie("t")
   return res.status('200').json({
     message: "signed out"
   })
 }
 

 const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth',
  algorithms: ['sha1', 'RS256', 'HS256']
})



//ubah data
// Change everyone without a last name to "Doe"
const editusersMethod = async (req, res) => {
    const { user_name, user_email, user_password, user_device_info} = req.body;
    const users =  await req.context.models.users.update({    
        user_name : user_name,
        user_email : user_email,
        user_password : user_password,
        user_device_info : user_device_info
     }, {
        where: { user_id : req.params.usersId }
          });
        return res.sendStatus(200);
  };

//hapus data
const deleteusersMethod = async (req, res) => {
    const result = await req.context.models.users.destroy({
      where: { user_id: req.params.usersId },
    });
  
    return res.send(true);
  };








// Gunakan export default agar semua function bisa dipakai di file lain.
export default{

    deleteusersMethod,
    editusersMethod,
    readAllUser,
    findUsersMethod,
    signup,
    signin,
    requireSignin,
    signout
}