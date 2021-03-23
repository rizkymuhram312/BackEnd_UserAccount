import { Router } from 'express';
import { sequelize, Op } from '../models/IndexModel';



// put your business logic using method sequalize
const readKodeposMethod = async (req, res) => {
    const kdpos = await req.context.models.kodepos.findAll(
    {
      include: [{
          model: req.context.models.address
      }]
    }
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
// const addKodeposMethod = async (req, res) => {
//     const {kodepos, kodepos_kec_id} = req.body;
//     const kdpos = await req.context.models.kodepos.create({
//         kodepos_kec_id: kodepos_kec_id,
//         kodepos : kodepos,
//     });
//     return res.send(kdpos);
// };

//tambah data
const addKodeposMethod = async (req, res) => {
  const {kodepos, kodepos_kec_id} = req.body.data;
  const kdpos = await req.context.models.kodepos.create({
      kodepos: kodepos,
      kodepos_kec_id : kodepos_kec_id,
  });
  return res.send(kdpos);
};




//ubah data
// Change everyone without a last name to "Doe"
const editKodeposMethod = async (req, res) => {
    const {kodepos_kec_id, kodepos} = req.body.data;
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

  const KodeposRest = async (req, res) => {
    const KodeposKec = await sequelize.query(
      // 'select p.prov_name, c.city_name,k.kec_name,o.kodepos from province p join city c on p.prov_id = c.city_prov_id join kecamatan k on c.city_id = k.kec_city_id join kodepos o on k.kec_id = o.kodepos_kec_id where kodepos= :acco_id group by city_id, prov_name,kec_name,kodepos'
      'select kodepos, kodepos_kec_id from kodepos where kodepos_kec_id = :kec_id'
      ,
      { replacements: { kec_id: req.params.KecId }, type: sequelize.QueryTypes.SELECT }
    );
    return res.send(KodeposKec);
  };

  const KodeposGet = async (req, res) => {
    const KodeposKecGet = await sequelize.query(
      // 'select p.prov_name, c.city_name,k.kec_name,o.kodepos from province p join city c on p.prov_id = c.city_prov_id join kecamatan k on c.city_id = k.kec_city_id join kodepos o on k.kec_id = o.kodepos_kec_id where kodepos= :acco_id group by city_id, prov_name,kec_name,kodepos'
      'select kodepos, kodepos_kec_id from kodepos o join kecamatan k on o.kodepos_kec_id = k.kec_id where kec_name = :kec_id'
      ,
      { replacements: { kec_id: req.params.KecId }, type: sequelize.QueryTypes.SELECT }
    );
    return res.send(KodeposKecGet);
  };



// Gunakan export default agar semua function bisa dipakai di file lain.
export default{
    readKodeposMethod,
    findKodeposMethod,
    addKodeposMethod,
    deleteKodeposMethod,
    editKodeposMethod,
    KodeposRest,
    KodeposGet
}