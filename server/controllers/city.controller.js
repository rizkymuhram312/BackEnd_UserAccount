import { Router } from 'express';
import { sequelize, Op } from '../models/IndexModel';



// put your business logic using method sequalize
const readCityMethod = async (req, res) => {
    const city = await req.context.models.city.findAll(
    {
      include: [{
          model: req.context.models.kecamatan
      }]
    }
  );
    return res.send(city); 
}

//filter pencarian data dengan primary key
const findCityMethod = async (req, res) => {
    const city = await req.context.models.city.findByPk(
      req.params.cityId,
    //   {
    //     include: [{
    //         model: req.context.models.address
    //     }]
    //   }
    );
    return res.send(city);
};


//*  filter by region_name 
// sql : select * from region where region_name like 'As%'
// stelah klausa where tentukan nama field yg akan difilter 
// pastikan object Op di export dari index.model*/
const filterCityByName = async (req, res) => {
   const city = await req.context.models.city.findAll(
       {
           where:
               { city_name: { [Op.like]: req.params.cityName + "%" } }
       }
    //    , 
    //    {
    //     include: [{
    //         model: req.context.models.address
    //     }]
    //    }
  
       
   );
   return res.send(city);
}


//tambah data
const addCityMethod = async (req, res) => {
    const {city_name, city_prov_id} = req.body.data;
    const city = await req.context.models.city.create({
      city_name: city_name,
      city_prov_id : city_prov_id,
    });
    return res.send(city);
};



//ubah data
// Change everyone without a last name to "Doe"
const editCityMethod = async (req, res) => {
    const {city_name, city_prov_id} = req.body.data;
    const city =  await req.context.models.city.update({    
        city_name: city_name,
        city_prov_id : city_prov_id
     }, {
        where: { city_id: req.params.cityId }
          });
        return res.sendStatus(200);
  };

//hapus data
const deleteCityMethod = async (req, res) => {
    const result = await req.context.models.city.destroy({
      where: { city_id: req.params.cityId },
    });
  
    return res.send(true);
  };

  const CityRest = async (req, res) => {
    const CityProv = await sequelize.query(
      // 'select p.prov_name, c.city_name,k.kec_name,o.kodepos from province p join city c on p.prov_id = c.city_prov_id join kecamatan k on c.city_id = k.kec_city_id join kodepos o on k.kec_id = o.kodepos_kec_id where kodepos= :acco_id group by city_id, prov_name,kec_name,kodepos'
      'select city_id, city_name, city_prov_id from city where city_prov_id = :prov_id'
      ,
      { replacements: { prov_id: req.params.ProvId }, type: sequelize.QueryTypes.SELECT }
    );
    return res.send(CityProv);
  };

  const CityGet = async (req, res) => {
    const CityProvGet = await sequelize.query(
      // 'select p.prov_name, c.city_name,k.kec_name,o.kodepos from province p join city c on p.prov_id = c.city_prov_id join kecamatan k on c.city_id = k.kec_city_id join kodepos o on k.kec_id = o.kodepos_kec_id where kodepos= :acco_id group by city_id, prov_name,kec_name,kodepos'
      'select city_id, city_name, city_prov_id from province p join city c on p.prov_id = c.city_prov_id where prov_name = :prov_id'
      ,
      { replacements: { prov_id: req.params.ProvId }, type: sequelize.QueryTypes.SELECT }
    );
    return res.send(CityProvGet);
  };


// Gunakan export default agar semua function bisa dipakai di file lain.
export default{
    readCityMethod,
    findCityMethod,
    addCityMethod,
    deleteCityMethod,
    editCityMethod,
    filterCityByName,
    CityRest,
    CityGet
}