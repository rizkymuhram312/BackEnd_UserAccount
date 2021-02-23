import { Router } from 'express';
import { sequelize, Op } from '../models/index';



// put your business logic using method sequalize
const readAddressMethod = async (req, res) => {
    const address = await req.context.models.address.findAll(
    // {
    //   include: [{
    //       model: req.context.models.address
    //   }]
    // }
  );
    return res.send(address); 
}

//filter pencarian data dengan primary key
const findAddressMethod = async (req, res) => {
    const address = await req.context.models.address.findByPk(
      req.params.addressId,
    //   {
    //     include: [{
    //         model: req.context.models.address
    //     }]
    //   }
    );
    return res.send(address);
};


//tambah data
const addAddressMethod = async (req, res) => {
    const { addr_address,
            addr_optional,
            addr_is_primary,
            addr_langitude,
            addr_latitude,
            addr_kodepos,
            addr_accu_id} = req.body;
    const address = await req.context.models.address.create({
            addr_address : addr_address,
            addr_optional : addr_optional,
            addr_is_primary : addr_is_primary,
            addr_langitude : addr_langitude,
            addr_latitude : addr_latitude,
            addr_kodepos : addr_kodepos,
            addr_accu_id : addr_accu_id,
    });
    return res.send(address);
};



//ubah data
// Change everyone without a last name to "Doe"
const editAddressMethod = async (req, res) => {
    const { addr_address,
            addr_optional,
            addr_is_primary,
            addr_langitude,
            addr_latitude,
            addr_kodepos,
            addr_accu_id} = req.body;
    const address =  await req.context.models.address.update({    
            addr_address : addr_address,
            addr_optional : addr_optional,
            addr_is_primary : addr_is_primary,
            addr_langitude : addr_langitude,
            addr_latitude : addr_latitude,
            addr_kodepos : addr_kodepos,
            addr_accu_id : addr_accu_id
     }, {
        where: { addr_id : req.params.addressId }
          });
        return res.sendStatus(200);
  };

//hapus data
const deleteAddressMethod = async (req, res) => {
    const result = await req.context.models.address.destroy({
      where: { addr_id: req.params.addressId },
    });
  
    return res.send(true);
  };



// Gunakan export default agar semua function bisa dipakai di file lain.
export default{
    readAddressMethod,
    findAddressMethod,
    addAddressMethod,
    deleteAddressMethod,
    editAddressMethod
}