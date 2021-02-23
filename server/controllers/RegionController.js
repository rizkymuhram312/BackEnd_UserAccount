
// findAll = select * from regions
const findAll = async (req, res) => {
    const regions = await req.context.models.Regions.findAll(
    );
    return res.send(regions);
}



// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
    findAll
}