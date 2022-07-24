import { Router } from "express";
import verifyToken from "../utils/verifyToken.js";

const router = Router();

import {
    postLogin, postFirstUserRegister, configureToken // getAllUser,// getUser,// updateUser,// deleteUser,  // sendOtp, findNearbyUser
} from "../controllers/UserController.js";

router.post("/auth/first/register", postFirstUserRegister);
router.post("/auth/login", postLogin);
router.post("/auth/configure/token", configureToken);

import {
    addShop,// getAllUser,// getUser,// updateUser,// deleteUser,  // sendOtp, findNearbyUser
} from "../controllers/shopController.js";
router.post("/shop/add", addShop);


import {
    shopListCard
} from "../controllers/dashboardController.js";

router.get("/dashboard/shoplist/card", verifyToken, shopListCard)























// router.post("/auth/sendotp", sendOtp);
// router.get("/user/nearby", findNearbyUser);
// router.route("/auth").get(getAllUser);
// router.route("/auth/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
