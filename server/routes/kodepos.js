import {Router} from 'express';
import kodeposCtrl from '../controllers/kodepos.controller'

const router = Router();

router.get('/', kodeposCtrl.readKodeposMethod);
router.get('/:kodeposId',kodeposCtrl.findKodeposMethod);
router.post('/',kodeposCtrl.addKodeposMethod);
router.put('/:kodeposId',kodeposCtrl.editKodeposMethod);
router.delete('/:kodeposId',kodeposCtrl.deleteKodeposMethod);
router.get('/search/:KecId', kodeposCtrl.KodeposRest);
router.get('/ambil/:KecId', kodeposCtrl.KodeposGet);

export default router;

