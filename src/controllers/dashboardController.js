import Shop from "../models/shopModel.js";
import User from "../models/userModel.js";
import { getAll, getOne, deleteOne } from "./BaseController.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { tokendata } from '../utils/tokenKey.js'



export async function shopListCard(req, res, next) {
    try {
        console.log("trigger");
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(ret => {
            User.aggregate([
                {
                    $match: {
                        "email": ret.email
                    }
                },
                {
                    $lookup: {
                        from: "shops",
                        localField: "shopid",
                        foreignField: "shopid",
                        as: "branch_info",
                    },
                },
                { 
                    $unwind: "$branch_info",
                },
            ])
                .then((result) => {
                    console.log("result",result)
                    res.status(201).json({
                        status: "success",
                        result
                    });
                })
                .catch((error) => {
                    console.log(error);
                });







            // User.findOne({ email: ret.email }, function (err, result) {
            //     result=[result]

            //     console.log("user details", result)
            //     Shop.find({ shopid: { $in: result[0].shopid } }, function (err2, response) {
            //         console.log("shop details", response)
            //         response.forEach(element => {
            //             shopidArr.push(element.shopid)
            //         });
            //         console.log("array", shopidArr)



            //         // res.status(201).json({
            //         //     status: "success",
            //         //     response
            //         // });
            //     })
            // });

        })

    } catch (error) {
        console.log(error)
        next(error);
    }
}

export const getAllRecharge = getAll(User);
export const getRecharge = getOne(User);
export const deleteRecharge = deleteOne(User);
