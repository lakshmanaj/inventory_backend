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

//Distributor controller
import { addDistributor, getAllDistributor, getOneDistributor, deleteDistributor, updateDistributor }
    from "../controllers/distributorController.js";

router.post("/distributor/add", verifyToken, addDistributor);
router.get("/distributor/getall", verifyToken, getAllDistributor)
router.get("/distributor/getone", verifyToken, getOneDistributor)
router.delete("/distributor/delete", verifyToken, deleteDistributor);
router.put("/distributor/update", verifyToken, updateDistributor);
//end Distributor controller

//Category controller
import { addCategory, getAllCategory, getOneCategory, deleteCategory, updateCategory }
    from "../controllers/categoryController.js";

router.post("/Category/add", verifyToken, addCategory);
router.get("/Category/getall", verifyToken, getAllCategory)
router.get("/Category/getone", verifyToken, getOneCategory)
router.delete("/Category/delete", verifyToken, deleteCategory);
router.put("/Category/update", verifyToken, updateCategory);
//end Category controller

//Godown controller
import { addGodown, getAllGodown, getOneGodown, deleteGodown, updateGodown }
    from "../controllers/godownController.js";

router.post("/Godown/add", verifyToken, addGodown);
router.get("/Godown/getall", verifyToken, getAllGodown)
router.get("/Godown/getone", verifyToken, getOneGodown)
router.delete("/Godown/delete", verifyToken, deleteGodown);
router.put("/Godown/update", verifyToken, updateGodown);
//end Godown controller

//Product controller
import { addProduct, getAllProduct, getOneProduct, deleteProduct, updateProduct }
    from "../controllers/productController.js";

router.post("/Product/add", verifyToken, addProduct);
router.get("/Product/getall", verifyToken, getAllProduct)
router.get("/Product/getone", verifyToken, getOneProduct)
router.delete("/Product/delete", verifyToken, deleteProduct);
router.put("/Product/update", verifyToken, updateProduct);
//end Product controller



//User controller
// import { branchListCard }
//     from "../controllers/dashboardController.js";


//User controller






















// router.post("/auth/sendotp", sendOtp);
// router.get("/user/nearby", findNearbyUser);
// router.route("/auth").get(getAllUser);
// router.route("/auth/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
