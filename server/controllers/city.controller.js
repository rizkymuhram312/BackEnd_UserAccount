import { Router } from 'express';
import { sequelize, Op } from '../models/index';



// put your business logic using method sequalize
const readCityMethod = async (req, res) => {
    const city = await req.context.models.city.findAll(
    // {
    //   include: [{
    //       model: req.context.models.address
    //   }]
    // }
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
    const {city_name, city_prov_id} = req.body;
    const city = await req.context.models.city.create({
      city_name: city_name,
      city_prov_id : city_prov_id,
    });
    return res.send(city);
};



//ubah data
// Change everyone without a last name to "Doe"
const editCityMethod = async (req, res) => {
    const {city_name, city_prov_id} = req.body;
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



// Gunakan export default agar semua function bisa dipakai di file lain.
export default{
    readCityMethod,
    findCityMethod,
    addCityMethod,
    deleteCityMethod,
    editCityMethod,
    filterCityByName
}