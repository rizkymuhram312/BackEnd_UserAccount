import {Router} from 'express';
import apiLogin from '../controllers/apiLogin';
import usersCtrl from '../controllers/users.controller'

const router = Router();

router.get('/', usersCtrl.requireSignin,usersCtrl.readUsersMethod);
router.get('/:usersId',usersCtrl.findUsersMethod);
router.post('/',usersCtrl.addUsersMethod);
router.put('/:usersId',usersCtrl.editUsersMethod);
router.delete('/:usersId',usersCtrl.deleteUsersMethod);
router.post('/signin',usersCtrl.signin);
router.post('/logout',usersCtrl.checkAccount,usersCtrl.signout);
router.post('/signup',usersCtrl.signup);


export default router;

