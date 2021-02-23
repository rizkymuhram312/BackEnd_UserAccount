import {Router} from 'express';
import usersCtrl from '../controllers/users.controller'

const router = Router();

router.get('/', usersCtrl.readUsersMethod);
router.get('/:usersId',usersCtrl.findUsersMethod);
router.post('/',usersCtrl.addUsersMethod);
router.put('/:usersId',usersCtrl.editUsersMethod);
router.delete('/:usersId',usersCtrl.deleteUsersMethod);

export default router;

