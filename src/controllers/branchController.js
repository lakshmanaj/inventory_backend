import Branch from "../models/branchModel.js";
import User from "../models/userModel.js";
import { getAll, getOne, deleteOne } from "./BaseController.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { tokendata } from '../utils/tokenKey.js'

export async function addBranch(req, res, next) {
    try {

        var returnTokenData;
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(ret => {
            returnTokenData = ret;

        })
        var postData = req.body;
        var newBranchid = "";
        var createBranch;
        var countDoc = await Branch.countDocuments({}).exec();
        if (countDoc == 0) {
            createBranch = new Branch({
                name: postData.name,
                address: postData.address,
                userid: returnTokenData.userid,
                branchid: "BRANCH001"
            })
            createBranch.save((err, result) => {
                if (!err) {
                    res.status(201).json({
                        status: "success",
                        message: "Branch created successfuly",
                    });
                }
            })
        }
        if (countDoc > 0) {
            newBranchid = "BRANCH00" + countDoc;
            var n = 1;
            for (var i = 0; i < n; i++) {
                var isExistBranch = await Branch.findOne({ "branchid": newBranchid }).exec();
                if (isExistBranch) {
                    countDoc = countDoc + 1
                    newBranchid = "BRANCH00" + countDoc;
                    n = n + 1;
                } else {
                    n = 0;
                    Branch.create({
                        name: postData.name,
                        address: postData.address,
                        userid: returnTokenData.userid,
                        branchid: newBranchid
                    }, function (err, suc) {
                        if (!err) {


                            User.updateOne(
                                { "_id": returnTokenData.userid },
                                { $push: { branchid: [newBranchid] } },
                                function (err, result) {
                                    if (err) {
                                        res.send(err);
                                    } else {
                                        console.log("ddddd")
                                        res.status(201).json({
                                            status: "success",
                                            message: "Branch created successfuly",
                                        });
                                    }
                                }
                            );



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


export async function getOneBranch(req, res, next) {
    try {
        const data = req.body;
        console.log("data", data)
        const branch = await Branch.findOne({ "_id": data.branchid });

        if (branch) {
            return res.json({ branch: branch });
        }

    } catch (error) {
        console.log(error)
        next(error);
    }
}


export async function getAllBranch(req, res, next) {
    try {
        console.log("trigger");
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(ret => {
            console.log("_id", ret.userid)
            User.aggregate([
                {
                    $match: {
                        email: ret.email, branchid: ret.branchid
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

        })

    } catch (error) {
        console.log(error)
        next(error);
    }
}


var myPromise = () => (
    new Promise((resolve, reject) => {

        //do something, fetch something....
        //you guessed it, mongo queries go here.
        User.find({})
            //I can continue to process my result inside my promise
            .then(function (result) {
                //another query can be called based on my result...
                return result;
            })
            //This promise may take a while...
            .then(function (result) {
                //post processing, non related mongo code...
                //when you are ready, you can resolve the promise.
                resolve(result);
            });
    })
);

var callMyPromise = async () => {
    var result = await (myPromise());
    return result;
};

// callMyPromise().then(function (result) {
//     res.status(201).json({
//         data: result, "value": i
//     });
// });

export async function updateBranch(req, res, next) {
    try {
        const id = req.query.id;
        const data = req.body;
        data.updated_at = new Date();
        Branch.findOneAndUpdate({ "_id": id }, data, (error, doc) => {
            if (!error) {
                res.status(201).json({
                    message: "Branch details updated"
                });
            } else {
                res.status(422).json({
                    message: "Failed"
                });
            }
        });


    } catch (error) {
        next(error);
    }
}

export const getAllRecharge = getAll(User);
export const getRecharge = getOne(User);
export const deleteRecharge = deleteOne(User);
