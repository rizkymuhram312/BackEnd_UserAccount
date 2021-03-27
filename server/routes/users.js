import {Router} from 'express';
// import usersCtrl from '../controllers/IndexController'
import indexCtrl from '../controllers/IndexController'
const { runValidation, validationDaftar, validationLogin } = require('../controllers/validation')
const verifyToken = require('./verifyToken')

const router = Router();

// router.get('/',verifyToken, usersCtrl.readUsersMethod);
// router.get('/:usersId',usersCtrl.findUsersMethod);
// router.post('/',validationDaftar,runValidation,usersCtrl.addUsersMethod);
// router.put('/:usersId',usersCtrl.editUsersMethod);
// router.delete('/:usersId',usersCtrl.deleteUsersMethod);

// router.post('/login',usersCtrl.loginUsersMethod);


router.put('/:usersId', indexCtrl.users.editusersMethod);
router.delete('/:usersId',indexCtrl.users.deleteusersMethod);
// router.get('/:usersId',indexCtrl.users.searchUserstMethod);
router.get('/',indexCtrl.users.requireSignin,indexCtrl.users.findUsersMethod);
router.post('/signup', indexCtrl.users.signup);
router.post('/signin/', validationLogin,runValidation,indexCtrl.users.signin);
router.post('/signout/', indexCtrl.users.signout);


router.get('/all/', indexCtrl.users.readAllUser);





export default router;

