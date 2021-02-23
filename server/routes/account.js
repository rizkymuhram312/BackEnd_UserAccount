import {Router} from 'express';
import accountCtrl from '../controllers/account.controller'

const router = Router();

router.get('/', accountCtrl.readAccountMethod);
router.get('/:accountId',accountCtrl.findAccountMethod);
router.post('/',accountCtrl.addAccountMethod);
router.put('/:accountId',accountCtrl.editAccountMethod);
router.delete('/:accountId',accountCtrl.deleteAccountMethod);

export default router;

