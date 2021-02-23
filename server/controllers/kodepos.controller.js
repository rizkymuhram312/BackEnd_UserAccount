import { Router } from 'express';
import { sequelize, Op } from '../models/index';



// put your business logic using method sequalize
const readKodeposMethod = async (req, res) => {
    const kdpos = await req.context.models.kodepos.findAll(
    // {
    //   include: [{
    //       model: req.context.models.address
    //   }]
    // }
  );
    return res.send(kdpos); 
}

//filter pencarian data dengan primary key
const findKodeposMethod = async (req, res) => {
    const kdpos = await req.context.models.kodepos.findByPk(
      req.params.kodeposId,
    //   {
    //     include: [{
    //         model: req.context.models.address
    //     }]
    //   }
    );
    return res.send(kdpos);
};


//tambah data
const addKodeposMethod = async (req, res) => {
    const {kodepos_kec_id, kodepos} = req.body;
    const kdpos = await req.context.models.kodepos.create({
        kodepos_kec_id: kodepos_kec_id,
        kodepos : kodepos,
    });
    return res.send(kdpos);
};



//ubah data
// Change everyone without a last name to "Doe"
const editKodeposMethod = async (req, res) => {
    const {kodepos_kec_id, kodepos} = req.body;
    const kdpos =  await req.context.models.kodepos.update({    
        kodepos_kec_id: kodepos_kec_id,
        kodepos : kodepos
     }, {
        where: { kodepos: req.params.kodeposId }
          });
        return res.sendStatus(200);
  };

//hapus data
const deleteKodeposMethod = async (req, res) => {
    const result = await req.context.models.kodepos.destroy({
      where: { kodepos: req.params.kodeposId },
    });
  
    return res.send(true);
  };



// Gunakan export default agar semua function bisa dipakai di file lain.
export default{
    readKodeposMethod,
    findKodeposMethod,
    addKodeposMethod,
    deleteKodeposMethod,
    editKodeposMethod
}