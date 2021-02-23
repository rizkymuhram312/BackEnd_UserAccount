// 1. import module Router & sequalize
import { Router } from 'express';
import kecamatanCtrl from '../controllers/kecamatan.controller'

//2. create object Router dan simpan di variable router
const router = Router();

router.get('/', kecamatanCtrl.readKecamatanMethod);
router.get('/:kecamatanId', kecamatanCtrl.findKecamatanMethod);
router.post('/', kecamatanCtrl.addKecamatanMethod);
router.delete('/:kecamatanId', kecamatanCtrl.deleteKecamatanMethod);
router.put('/:kecamatanId', kecamatanCtrl.editKecamatanMethod);
router.get('/cari/:kecamatanName', kecamatanCtrl.filterKecamatanByName);


export default router;


