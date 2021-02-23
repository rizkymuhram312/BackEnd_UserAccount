//view data
const readProvinceMethod = async (req,res) => {
    const province = await req.context.models.province.findAll(
        {
            //Tambah Include
            include: [{
                model: req.context.models.city
            }]
        }

    );
    return res.send(province);
}

//filter data with parameter
const findProvinceMethod = async (req,res) => {
    const province = await req.context.models.province.findByPk(
        req.params.provId,
        {
            //Tambah Include
            include: [{
                model: req.context.models.city
            }]
        }
    );
    return res.send(province);
};

//Insert data
const addProvinceMethod = async (req,res) => {
    const {prov_name} = req.body;
    const province = await req.context.models.province.create({
        prov_name: prov_name
    });
    return res.send(province);
};

//Ubah data
const editProvinceMethod = async (req,res) => {
    const {prov_name} = req.body;
    const province = await req.context.models.province.update({
        prov_name: prov_name
    },
    {
        where: {prov_id: req.params.provId}
    });
    return res.sendStatus(200);
};

//hapus data
const deleteProvinceMethod = async (req,res) => {
    const province = await req.context.models.province.destroy({
        where: {prov_id: req.params.provId},
    });
    return res.send(true);
};


//export
export default{
    readProvinceMethod,
    findProvinceMethod,
    addProvinceMethod,
    editProvinceMethod,
    deleteProvinceMethod
}