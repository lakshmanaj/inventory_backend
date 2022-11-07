import { Router } from "express";
import verifyToken from "../utils/verifyToken.js";

const router = Router();

//User controller
import { postLogin, postFirstUserRegister, configureToken, getUserById, ChangePassword }
    from "../controllers/UserController.js";

router.post("/auth/login", postLogin);
router.post("/auth/first/register", postFirstUserRegister);
router.post("/auth/configure/token", verifyToken, configureToken);
router.get("/user/profile/:id", verifyToken, getUserById);
router.post("/user/changepassword", verifyToken, ChangePassword);
//end User controller


//Branch controller
import { addBranch, deleteBranch, getAllBranch, getOneBranch, updateBranch }
    from "../controllers/branchController.js";
router.post("/branch/add", verifyToken, addBranch);
router.get("/branch/getone/:id", verifyToken, getOneBranch)
router.get("/branch/getall", verifyToken, getAllBranch);
router.post("/branch/getall/filter", verifyToken, getAllBranch)
router.get("/branch/getall/limit", verifyToken, getAllBranch)
router.put("/branch/update/:id", verifyToken, updateBranch);
router.delete("/branch/delete/:id", verifyToken, deleteBranch);
//end Branch controller

//Distributor controller
import { addDistributor, getAllDistributor, getOneDistributor, deleteDistributor, updateDistributor, getAllDistributorWithLimit, getAllDistributorNameList }
    from "../controllers/distributorController.js";

router.post("/distributor/add", verifyToken, addDistributor);
router.get("/distributor/getall", verifyToken, getAllDistributor)
router.get("/distributor/getall/namelist", verifyToken, getAllDistributorNameList)
router.get("/distributor/getall/limit", verifyToken, getAllDistributorWithLimit)
router.get("/distributor/getone/:id", verifyToken, getOneDistributor)
router.delete("/distributor/delete/:id", verifyToken, deleteDistributor);
router.put("/distributor/update/:id", verifyToken, updateDistributor);
//end Distributor controller

//Brand controller
import { addBrand, getAllBrand, getOneBrand, deleteBrand, updateBrand, getAllBrandWithLimit, getAllBrandNameList }
    from "../controllers/brandController.js";

router.post("/brand/add", verifyToken, addBrand);
router.get("/brand/getall", verifyToken, getAllBrand)
router.get("/brand/getall/namelist", verifyToken, getAllBrandNameList)
router.get("/brand/getall/limit", verifyToken, getAllBrandWithLimit)
router.get("/brand/getone/:id", verifyToken, getOneBrand)
router.delete("/brand/delete/:id", verifyToken, deleteBrand);
router.put("/brand/update/:id", verifyToken, updateBrand);
//end Brand controller

//Category controller
import { addCategory, getAllCategory, getOneCategory, deleteCategory, updateCategory, getAllCategoryWithLimit, getAllCategoryNameList }
    from "../controllers/categoryController.js";

router.post("/category/add", verifyToken, addCategory);
router.get("/category/getall", verifyToken, getAllCategory)
router.get("/category/getall/namelist", verifyToken, getAllCategoryNameList)
router.get("/category/getall/limit", verifyToken, getAllCategoryWithLimit)
router.get("/category/getone/:id", verifyToken, getOneCategory)
router.delete("/category/delete/:id", verifyToken, deleteCategory);
router.put("/category/update/:id", verifyToken, updateCategory);
//end Category controller

//Godown controller
import { addGodown, getAllGodown, getOneGodown, deleteGodown, updateGodown }
    from "../controllers/godownController.js";

router.post("/godown/add", verifyToken, addGodown);
router.get("/godown/getall", verifyToken, getAllGodown)
router.get("/godown/getone/:id", verifyToken, getOneGodown)
router.delete("/godown/delete/:id", verifyToken, deleteGodown);
router.put("/godown/update/:id", verifyToken, updateGodown);
//end Godown controller

//Unit controller
import { addUnit, getAllUnit, getOneUnit, deleteUnit, updateUnit, getAllUnitByProductId }
    from "../controllers/unitController.js";

router.post("/unit/add", verifyToken, addUnit);
router.get("/unit/getall/byproductid/:id", verifyToken, getAllUnitByProductId)
router.get("/unit/getall", verifyToken, getAllUnit)
router.get("/unit/getone/:id", verifyToken, getOneUnit)
router.delete("/unit/delete/:id", verifyToken, deleteUnit);
router.put("/unit/update/:id", verifyToken, updateUnit);
//end Unit controller

//Product controller
import { addProduct, getAllProduct, getOneProduct, deleteProduct, updateProduct, getAllProductWithLimit, ProductUpload }
    from "../controllers/productController.js";

router.post("/product/add", verifyToken, addProduct);
router.post("/product/upload", verifyToken, ProductUpload);
router.get("/product/getall/limit", verifyToken, getAllProductWithLimit)
router.get("/product/getall", verifyToken, getAllProduct)
router.get("/product/getone/:id", verifyToken, getOneProduct)
router.delete("/product/delete/:id", verifyToken, deleteProduct);
router.put("/product/update/:id", verifyToken, updateProduct);
//end Product controller


//Inbound controller
import { addInbound, getAllInbound, getOneInbound, deleteInbound, updateInbound, getOneInboundByProduct }
    from "../controllers/InboundController.js";

router.post("/inbound/add", verifyToken, addInbound);
router.get("/inbound/getall", verifyToken, getAllInbound)
router.get("/inbound/getone/byproduct/:id", verifyToken, getOneInboundByProduct)
router.get("/inbound/getone/:id", verifyToken, getOneInbound)
router.delete("/inbound/delete/:id", verifyToken, deleteInbound);
router.put("/inbound/update/:id", verifyToken, updateInbound);
//end Inbound controller

//Outbound controller
import { addOutbound, getAllOutbound, getOneOutbound, deleteOutbound, updateOutbound }
    from "../controllers/OutboundController.js";

router.post("/outbound/add", verifyToken, addOutbound);
router.get("/outbound/getall", verifyToken, getAllOutbound)
router.get("/outbound/getone/:id", verifyToken, getOneOutbound)
router.delete("/outbound/delete/:id", verifyToken, deleteOutbound);
router.put("/outbound/update/:id", verifyToken, updateOutbound);
//end Outbound controller

//Customer controller
import { addCustomer, getAllCustomer, getOneCustomer, deleteCustomer, updateCustomer }
    from "../controllers/CustomerController.js";

router.post("/customer/add", verifyToken, addCustomer);
router.get("/customer/getall", verifyToken, getAllCustomer)
router.get("/customer/getone/:id", verifyToken, getOneCustomer)
router.delete("/customer/delete/:id", verifyToken, deleteCustomer);
router.put("/customer/update/:id", verifyToken, updateCustomer);
//end Customer controller

















// router.post("/auth/sendotp", sendOtp);
// router.get("/user/nearby", findNearbyUser);
// router.route("/auth").get(getAllUser);
// router.route("/auth/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
