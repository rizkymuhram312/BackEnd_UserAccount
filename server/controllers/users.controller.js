import { Router } from 'express';
import { sequelize, Op } from '../models/index';
// import {users} from '../models/users.model';


const bcrypt = require('bcrypt');
const salt = 10;
const jsonwebtoken = require('jsonwebtoken')




// put your business logic using method sequalize
const readUsersMethod = async (req, res) => {
    const users = await req.context.models.users.findAll(
    {
      include: [{
          model: req.context.models.account
      }]
    }
  );
    return res.send(users); 
}

//filter pencarian data dengan primary key
const findUsersMethod = async (req, res) => {
    const users = await req.context.models.users.findByPk(
      req.params.usersId,
      {
        include: [{
            model: req.context.models.account
        }]
      }
    );
    return res.send(users);
};


// hash password dengan salt 
// const hashPassword = bcrypt.hashSync(user_password, salt);

// console.log(hashPassword)


//tambah dataaaaa
const addUsersMethod = async (req, res) => {
    const { user_name, user_email, user_password, user_device_info} = req.body;
    const hashPassword = bcrypt.hashSync(user_password, salt);
    const hashDeviceInfo = bcrypt.hashSync(user_device_info, salt);
    const users = await req.context.models.users.create({
        user_name : user_name,
        user_email : user_email,
        user_password : hashPassword,
        user_device_info : hashDeviceInfo,
    });
    return res.send(users);
};

const loginUsersMethod = async (req,res) => {
  const {user_name,user_email, user_password, user_device_info} =req.body

  const datauser = await req.context.models.users.findOne(  {  where : { user_name: user_name} } )
  if( datauser ) {
    const passwordUser = await bcrypt.compare(user_password, datauser.user_password)
    if (passwordUser) {
      
      const data = {
        id: datauser.user_id
      }

      const token = await jsonwebtoken.sign(data, `${process.env.JWT_SECRET_KEY}`)
      return res.status(200).json({
        message: 'berhasil',
        token : token,
        user_name : user_name,
        user_email : datauser.user_email,
        user_password : datauser.user_password,
        user_device_info : datauser.user_device_info
      })
    }
  } 
  
  else{
    return res.status(404).json({
      message: 'username atau email tidak tersedia',
    })
  }

}



//ubah data
// Change everyone without a last name to "Doe"
const editUsersMethod = async (req, res) => {
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
const deleteUsersMethod = async (req, res) => {
    const result = await req.context.models.users.destroy({
      where: { user_id: req.params.usersId },
    });
  
    return res.send(true);
  };



// Gunakan export default agar semua function bisa dipakai di file lain.
export default{
    readUsersMethod,
    findUsersMethod,
    addUsersMethod,
    deleteUsersMethod,
    editUsersMethod,

    loginUsersMethod
}