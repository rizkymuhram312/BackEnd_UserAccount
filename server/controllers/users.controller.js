import { Router } from 'express';
import { sequelize, Op } from '../models/index';
const bcrypt = require('bcrypt');
const salt = 10;




// put your business logic using method sequalize
const readUsersMethod = async (req, res) => {
    const users = await req.context.models.users.findAll(
    // {
    //   include: [{
    //       model: req.context.models.users
    //   }]
    // }
  );
    return res.send(users); 
}

//filter pencarian data dengan primary key
const findUsersMethod = async (req, res) => {
    const users = await req.context.models.users.findByPk(
      req.params.usersId,
    //   {
    //     include: [{
    //         model: req.context.models.users
    //     }]
    //   }
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
    editUsersMethod
}