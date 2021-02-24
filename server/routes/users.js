import {Router} from 'express';
import usersCtrl from '../controllers/users.controller'
const { runValidation, validationDaftar } = require('../controllers/validation')
const verifyToken = require('./verifyToken')

const router = Router();

router.get('/',verifyToken, usersCtrl.readUsersMethod);
router.get('/:usersId',usersCtrl.findUsersMethod);
router.post('/',validationDaftar,runValidation,usersCtrl.addUsersMethod);
router.put('/:usersId',usersCtrl.editUsersMethod);
router.delete('/:usersId',usersCtrl.deleteUsersMethod);

router.post('/login',usersCtrl.loginUsersMethod);


export default router;

