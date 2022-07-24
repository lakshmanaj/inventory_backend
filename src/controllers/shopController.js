import Shop from "../models/shopModel.js";
import User from "../models/userModel.js";
import { getAll, getOne, deleteOne } from "./BaseController.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { tokendata } from '../utils/tokenKey.js'

export async function addShop(req, res, next) {
    try {
        var postData = req.body;
        var newShopid = "";
        var shopCreated;
        var countDoc = await Shop.countDocuments({}).exec();
        if (countDoc == 0) {
            shopCreated = await Shop.create({
                name: postData.name,
                address: postData.address,
                userid: postData.userid,
                shopid: "BRANCH001"
            });
        }
        if (countDoc > 0) {
            newShopid = "BRANCH00" + countDoc;
            var n = 1;
            for (var i = 0; i < n; i++) {
                var isExistShop = await Shop.findOne({ "shopid": newShopid }).exec();
                if (isExistShop) {
                    countDoc = countDoc + 1
                    newShopid = "BRANCH00" + countDoc;
                    n = n + 1;
                } else {
                    n = 0;
                    Shop.create({
                        name: postData.name,
                        address: postData.address,
                        userid: postData.userid,
                        shopid: newShopid
                    }, function (err, suc) {
                        if (!err) {

                            const token =
                                req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
                            tokendata(token).then(ret => {

                                User.updateOne(
                                    { "_id": ret.user_id },
                                    { $push: { shopid: [newShopid] } },
                                    function (err, result) {
                                        if (err) {
                                            res.send(err);
                                        } else {
                                            res.status(201).json({
                                                status: "success",
                                                message: "Shop created successfuly",
                                            });
                                        }
                                    }
                                );
                                
                            })


                        }
                    });
                }

            }
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export async function postFirstUserRegister(req, res, next) {
    try {
        const data = req.body;
        console.log(".........", data)
        const exist = await User.find({ email: data.email });

        if (exist.length == 0) {
            const createData = await User.create({
                username: data.username,
                password: bcrypt.hashSync(data.password, 10),
                email: data.email,
                phone: data.phone,
                address: data.address,
                shopid: '',
                usertype: "SA"
            });

            res.status(201).json({
                status: "success",
                message: "User Created Successfuly",
                data: {
                    createData,
                },
            });
        } else {
            res.status(201).json({
                status: "success",
                message: "User Already Exist",
                data: {
                    exist,
                },
            });
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export async function postLogin(req, res, next) {
    try {
        const data = req.body;
        console.log(data)
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return res.status(422).send({ message: "Email does not exist" });
        }
        if (user.length == 0) {
            return res.status(422).send({ message: "Email does not exist" });
        }
        if (user) {
            if (user.is_active == false)
                return res.status(422).send({ message: "We are precessing your data..." });
            if (user.is_blocked == true)
                return res.status(422).send({ message: "Sorry.. we are not processing your data, please contact your admin..." });
            var result = bcrypt.compareSync(req.body.password, user.password);
            if (result) {

                const token = jwt.sign(
                    { user_id: user._id, email: user.email, usertype: user.usertype, username: user.username },
                    // process.env.TOKEN_KEY,
                    "34354",
                    {
                        expiresIn: "2h",
                    }
                );

                return res.json({ token: token, message: "Loggedin successfully" });
            } else {
                return res.status(422).send({ message: "Invalid password" });
            }
        }


        // if (exist.length == 0) {
        //   const createData = await User.create({
        //     username: data.username,
        //     password: bcrypt.hashSync(data.password, 10),
        //     email: data.email,
        //     phone: data.phone,
        //     address: data.address,
        //     shopid: '',
        //     usertype: "O"
        //   });

        //   res.status(201).json({
        //     status: "success",
        //     message: "User Created Successfuly",
        //     data: {
        //       createData,
        //     },
        //   });
        // } else {
        //   res.status(201).json({
        //     status: "success",
        //     message: "User Already Exist",
        //     data: {
        //       exist,
        //     },
        //   });
        // }
    } catch (error) {
        console.log(error)
        next(error);
    }
}

// export async function postLogin(req, res, next) {
//   try {
//       console.log("trig.................",data)
//       User.findOne({ 'email': req.body.email }, function (err, user) {
//           if (!user) {
//               return res.status(422).send({ message: "Email does not exist" });
//           }
//           if (user) {
//               if (user.isActive == "false")
//                   return res.status(422).send({ message: "We are precessing your data..." });
//               if (user.isBlocked == "true")
//                   return res.status(422).send({ message: "Sorry.. we are not processing your data, please contact your admin..." });
//               var result = bcrypt.compareSync(req.body.password, user.password);
//               if (result) {

//                   const token = jwt.sign(
//                       { user_id: user._id, email: user.email, usertype: user.usertype, username: user.username },
//                       process.env.TOKEN_KEY,
//                       {
//                           expiresIn: "2h",
//                       }
//                   );

//                   return res.json({ token: token });
//               } else {
//                   return res.status(422).send({ message: "The password is invalid" });
//               }
//           }

//       });
//   } catch (error) {
//       res.status(500).send(error);
//   }
// }

export async function updateRecharge(req, res, next) {
    try {
        const id = req.params.id;
        const data = req.body;

        const editedData = {
            number: data.number,
            amount: data.amount,
            network: data.network,
            balance: data.balance,
            status: data.status,
            is_active: data.is_active,
            is_verified: data.is_verified,
            is_deleted: data.is_deleted,
        };
        const editDetail = await User.findByIdAndUpdate(id, editedData, {
            new: true,
            runValidators: true,
        });

        res.status(201).json({
            status: "success",
            message: "Recharge Details Updated Successfuly",
            data: {
                editDetail,
            },
        });
    } catch (error) {
        next(error);
    }
}

export const getAllRecharge = getAll(User);
export const getRecharge = getOne(User);
export const deleteRecharge = deleteOne(User);
