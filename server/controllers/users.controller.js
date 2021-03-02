import { Router } from 'express';
import config from '../../config/config'
import AuthHelper from '../helpers/AuthHelper';
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import { sequelize, Op } from '../models/index';






// put your business logic using method sequalize
const readUsersMethod = async (req, res) => {
    const users = await req.context.models.users.findAll(
    {include: [{
            model: req.context.models.account
        }],
      attributes:{exclude:['user_password','user_salt']
          
      }
    }
  );
    return res.send(users); 
}



const signup = async (req,res) => {
  const {dataValues} = new req.context.models.users(req.body);

  const salt = AuthHelper.makeSalt();
  const hashPassword = AuthHelper.hashPassword(dataValues.user_password, salt);

  const users = await req.context.models.users.create({
    user_name: dataValues.user_name,
    user_email:dataValues.user_email,
    user_password:hashPassword,
    user_device_info:dataValues.user_device_info,
    user_salt:salt
  });
  return res.send(users);
}

const signin = async (req,res) => {
  const {user_email, user_password} = req.body
  //mencari user_emai yg dikirm dari body
  try {
    const users = await req.context.models.users.findOne({
      where : {user_email:user_email}, include: [{
        model: req.context.models.account
      }]
    });

    if (!users){
      return res.status('400').json({
        error:"User no found"
      });
    }

    //check user password
    if(!AuthHelper.authenticate(user_password, users.dataValues.user_password, users.dataValues.user_salt)){
      return res.status('401').send({
        error:"Email and Password Doesnt Match"
      })
    }

    const token = jwt.sign({ _id:users.user_id}, config.jwtSecret)
//set expire cookies
    res.cookie("t",token,{
      expire: new Date() +9999
    })

    const {account} = users.dataValues;
    if (account == undefined){
      return res.
      // status().send(401)
      json({token,users: {
        user_id : users.dataValues.user_id,
        user_name : users.dataValues.user_name,
        user_email:users.dataValues.user_email,
        accounts : null
      
        
        
      }});
    }
    else {
      return res.json({token,users: {
        user_id : users.dataValues.user_id,
        user_name : users.dataValues.user_name,
        user_email:users.dataValues.user_email,
        accounts : account.dataValues
      
        
        
      }});
    }
 



  } catch(err){
    return res.status('400').json({
      error: "Could not retrieve user"
    });
  } 
}

const signout = (req,res) => {
  res.clearCookie("t")
  return res.status('200').json({
    message:"Signed Out"
  })
}

const checkAccount = async (req,res) => {

  const {account} = users.dataValues;
    if (account == undefined){
      return res.status().send(401)
    }
    else{
      return res.status().send(201)
    }
  
}

const requireSignin = expressJwt({
  secret : config.jwtSecret,
  useProperty : 'auth',
  algorithms : ['sha1','RS256','HS256'] 
})

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
    signin,
    signup,
    signout,
    requireSignin,
    checkAccount
}