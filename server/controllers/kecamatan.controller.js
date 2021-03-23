import { Router } from 'express';
import { sequelize, Op } from '../models/IndexModel';



// put your business logic using method sequalize
const readKecamatanMethod = async (req, res) => {
    const kecamatan = await req.context.models.kecamatan.findAll(
    {
      include: [{
          model: req.context.models.kodepos
      }]
    }
  );
    return res.send(kecamatan); 
}

//filter pencarian data dengan primary key
const findKecamatanMethod = async (req, res) => {
    const kecamatan = await req.context.models.kecamatan.findByPk(
      req.params.kecamatanId,
    //   {
    //     include: [{
    //         model: req.context.models.address
    //     }]
    //   }
    );
    return res.send(kecamatan);
};


//*  filter by region_name 
// sql : select * from region where region_name like 'As%'
// stelah klausa where tentukan nama field yg akan difilter 
// pastikan object Op di export dari index.model*/
const filterKecamatanByName = async (req, res) => {
   const kecamatan = await req.context.models.kecamatan.findAll(
       {
           where:
               { kec_name: { [Op.like]: req.params.kecamatanName + "%" } }
       }
    //    , 
    //    {
    //     include: [{
    //         model: req.context.models.address
    //     }]
    //    }
  
       
   );
   return res.send(kecamatan);
}


//tambah data
const addKecamatanMethod = async (req, res) => {
    const {kec_name, kec_city_id} = req.body.data;
    const kecamatan = await req.context.models.kecamatan.create({
        kec_name: kec_name,
        kec_city_id : kec_city_id,
    });
    return res.send(kecamatan);
};



//ubah data
// Change everyone without a last name to "Doe"
const editKecamatanMethod = async (req, res) => {
    const {kec_name, kec_city_id} = req.body.data;
    const kecamatan =  await req.context.models.kecamatan.update({    
        kec_name: kec_name,
        kec_city_id : kec_city_id
     }, {
        where: { kec_id: req.params.kecamatanId }
          });
        return res.sendStatus(200);
  };

//hapus data
const deleteKecamatanMethod = async (req, res) => {
    const result = await req.context.models.kecamatan.destroy({
      where: { kec_id: req.params.kecamatanId },
    });
  
    return res.send(true);
  };

  const KecamatanRest = async (req, res) => {
    const KecamatanCity = await sequelize.query(
      // 'select p.prov_name, c.city_name,k.kec_name,o.kodepos from province p join city c on p.prov_id = c.city_prov_id join kecamatan k on c.city_id = k.kec_city_id join kodepos o on k.kec_id = o.kodepos_kec_id where kodepos= :acco_id group by city_id, prov_name,kec_name,kodepos'
      'select kec_id, kec_name, kec_city_id from kecamatan where kec_city_id = :city_id'
      ,
      { replacements: { city_id: req.params.CityId }, type: sequelize.QueryTypes.SELECT }
    );
    return res.send(KecamatanCity);
  };

  const KecamatanGet = async (req, res) => {
    const KecaCityGet = await sequelize.query(
      // 'select p.prov_name, c.city_name,k.kec_name,o.kodepos from province p join city c on p.prov_id = c.city_prov_id join kecamatan k on c.city_id = k.kec_city_id join kodepos o on k.kec_id = o.kodepos_kec_id where kodepos= :acco_id group by city_id, prov_name,kec_name,kodepos'
      'select kec_id, kec_name, kec_city_id from city c join kecamatan k on c.city_id = k.kec_city_id where city_name = :city_id'
      ,
      { replacements: { city_id: req.params.CityId }, type: sequelize.QueryTypes.SELECT }
    );
    return res.send(KecaCityGet);
  };



// Gunakan export default agar semua function bisa dipakai di file lain.
export default{
    readKecamatanMethod,
    findKecamatanMethod,
    addKecamatanMethod,
    deleteKecamatanMethod,
    editKecamatanMethod,
    filterKecamatanByName,
    KecamatanRest,
    KecamatanGet
}