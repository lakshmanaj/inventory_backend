import Branch from "../models/branchModel.js";
import User from "../models/userModel.js";
import { getAll, getOne, deleteOne } from "./BaseController.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { tokendata } from '../utils/tokenKey.js'



export async function branchListCard(req, res, next) {
    try {
        console.log("trigger");
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(ret => {
            console.log("_id", ret.user_id)
            User.aggregate([
                {
                    $match: {
                        "email": ret.email
                    }
                },
                {
                    $lookup: {
                        from: "branchs",
                        localField: "branchid",
                        foreignField: "branchid",
                        as: "branch_info",
                    },
                },
                {
                    $unwind: "$branch_info",
                },
                



            ])
                .then((result) => {
                    console.log("result", result)
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
            //     Branch.find({ branchid: { $in: result[0].branchid } }, function (err2, response) {
            //         console.log("branch details", response)
            //         response.forEach(element => {
            //             branchidArr.push(element.branchid)
            //         });
            //         console.log("array", branchidArr)



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
