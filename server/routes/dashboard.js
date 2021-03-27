import { Router } from "express";
import IndexController from "../controllers/IndexController";



const router = Router();

router.get('/',IndexController.dashboard.JumlahOrder);
router.get('/laris',IndexController.dashboard.ProdukLaris);
router.get('/ProdCancel',IndexController.dashboard.ProdukCancel);
router.get('/OrderCityBuy',IndexController.dashboard.ProdCityBuyer);
router.get('/OrderCitySeller',IndexController.dashboard.ProdCitySeller);
router.get('/OrderCBT',IndexController.dashboard.TotalOrderCB);
router.get('/OrderCST',IndexController.dashboard.TotalOrderCS);
router.get('/ProdCBT',IndexController.dashboard.TotalProductCB);
router.get('/ProdCST',IndexController.dashboard.TotalProductCS);


export default router;

