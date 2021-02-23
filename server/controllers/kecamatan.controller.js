import { Router } from 'express';
import { sequelize, Op } from '../models/index';



// put your business logic using method sequalize
const readKecamatanMethod = async (req, res) => {
    const kecamatan = await req.context.models.kecamatan.findAll(
    // {
    //   include: [{
    //       model: req.context.models.address
    //   }]
    // }
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
    const {kec_name, kec_city_id} = req.body;
    const kecamatan = await req.context.models.kecamatan.create({
        kec_name: kec_name,
        kec_city_id : kec_city_id,
    });
    return res.send(kecamatan);
};



//ubah data
// Change everyone without a last name to "Doe"
const editKecamatanMethod = async (req, res) => {
    const {kec_name, kec_city_id} = req.body;
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



// Gunakan export default agar semua function bisa dipakai di file lain.
export default{
    readKecamatanMethod,
    findKecamatanMethod,
    addKecamatanMethod,
    deleteKecamatanMethod,
    editKecamatanMethod,
    filterKecamatanByName
}