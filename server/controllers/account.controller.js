import { Router } from 'express';
import { sequelize, Op } from '../models/index';



// put your business logic using method sequalize
const readAccountMethod = async (req, res) => {
    const account = await req.context.models.account.findAll(
    // {
    //   include: [{
    //       model: req.context.models.account
    //   }]
    // }
  );
    return res.send(account); 
}

//filter pencarian data dengan primary key
const findAccountMethod = async (req, res) => {
    const account = await req.context.models.account.findByPk(
      req.params.accountId,
    //   {
    //     include: [{
    //         model: req.context.models.account
    //     }]
    //   }
    );
    return res.send(account);
};


//tambah data
const addAccountMethod = async (req, res) => {
    const { acco_username,
            acco_nama,
            acco_phone,
            acco_shopname,
            acco_gender,
            acco_birthdate,
            acco_avatar,
            acco_user_id} = req.body;
    const account = await req.context.models.account.create({
        acco_username : acco_username,
        acco_nama : acco_nama,
        acco_phone : acco_phone,
        acco_shopname : acco_shopname,
        acco_gender : acco_gender,
        acco_birthdate : acco_birthdate,
        acco_avatar : acco_avatar,
        acco_user_id : acco_user_id,
    });
    return res.send(account);
};



//ubah data
// Change everyone without a last name to "Doe"
const editAccountMethod = async (req, res) => {
    const { acco_username ,
            acco_nama,
            acco_phone ,
            acco_shopname ,
            acco_gender,
            acco_birthdate ,
            acco_avatar ,
            acco_user_id} = req.body;
    const account =  await req.context.models.account.update({    
            acco_username : acco_username,
            acco_nama : acco_nama,
            acco_phone : acco_phone,
            acco_shopname : acco_shopname,
            acco_gender : acco_gender,
            acco_birthdate : acco_birthdate,
            acco_avatar : acco_avatar,
            acco_user_id : acco_user_id
     }, {
        where: { acco_id : req.params.accountId }
          });
        return res.sendStatus(200);
  };

//hapus data
const deleteAccountMethod = async (req, res) => {
    const result = await req.context.models.account.destroy({
      where: { acco_id: req.params.accountId },
    });
  
    return res.send(true);
  };



// Gunakan export default agar semua function bisa dipakai di file lain.
export default{
    readAccountMethod,
    findAccountMethod,
    addAccountMethod,
    deleteAccountMethod,
    editAccountMethod
}