import { Router } from "express";
import verifyToken from "../utils/verifyToken.js";

const router = Router();



//User controller
import { postLogin, postFirstUserRegister, configureToken }
    from "../controllers/UserController.js";

router.post("/auth/login", postLogin);
router.post("/auth/first/register", verifyToken, postFirstUserRegister);
router.post("/auth/configure/token", verifyToken, configureToken);
//end User controller


//Branch controller
import { addBranch, branchListCard, BranchDetails, updateBranch }
    from "../controllers/branchController.js";
router.get("/branch/detail", verifyToken, BranchDetails)
router.get("/dashboard/branchlist/card", verifyToken, branchListCard)
router.post("/branch/add", verifyToken, addBranch);
router.put("/branch/update", verifyToken, updateBranch);
//end Branch controller

//Branch controller
import { addDistributor, getAllDistributor, getOneDistributor, deleteDistributor, updateDistributor }
    from "../controllers/distributorController.js";

    router.post("/distributor/add", verifyToken, addDistributor);
router.get("/distributor/getall", verifyToken, getAllDistributor)
router.get("/distributor/getone", verifyToken, getOneDistributor)
router.delete("/distributor/delete", verifyToken, deleteDistributor);
router.put("/distributor/update", verifyToken, updateDistributor);
//end Branch controller



//User controller
// import { branchListCard }
//     from "../controllers/dashboardController.js";


//User controller






















// router.post("/auth/sendotp", sendOtp);
// router.get("/user/nearby", findNearbyUser);
// router.route("/auth").get(getAllUser);
// router.route("/auth/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
