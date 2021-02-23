// 1. import module Router & sequalize
import { Router } from 'express';
import cityCtrl from '../controllers/city.controller'

//2. create object Router dan simpan di variable router
const router = Router();

router.get('/', cityCtrl.readCityMethod);
router.get('/:cityId', cityCtrl.findCityMethod);
router.post('/', cityCtrl.addCityMethod);
router.delete('/:cityId', cityCtrl.deleteCityMethod);
router.put('/:cityId', cityCtrl.editCityMethod);
router.get('/cari/:cityName', cityCtrl.filterCityByName);


export default router;


