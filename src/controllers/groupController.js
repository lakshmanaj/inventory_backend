import Branch from "../models/branchModel.js";
import User from "../models/userModel.js";
import { getAll, getOne, deleteOne } from "./BaseController.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { tokendata } from '../utils/tokenKey.js'

export async function addGroup(req, res, next) {
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
                description: postData.description,
                userid: returnTokenData.userid,
                branchid: "BRANCH001"
            })
            createBranch.save((err, result) => {
                if (!err) {

                    User.updateOne(
                        { "_id": returnTokenData.userid },
                        { $push: { branchid: "BRANCH001" } },
                        function (err, result) {
                            if (err) {
                                res.send(err);
                            } else {
                                res.status(201).json({
                                    status: "success",
                                    message: "Branch created successfuly",
                                });
                            }
                        }
                    );
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
                        description: postData.description,
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
        const branch = await Branch.findOne({ "_id": data.branchid });

        if (branch) {
            return res.json({ branch: branch });
        }

    } catch (error) {
        console.log(error)
        next(error);
    }
}

export async function getAllBranchWithLimit(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(ret => {

            User.aggregate([
                {
                    $match: {
                        email: ret.email
                    }
                },
                {
                    $lookup: {
                        from: "branches",
                        localField: "branchid",
                        foreignField: "branchid",
                        as: "branch_info",
                    },
                },
                {
                    $unwind: "$branch_info",
                },
                { "$limit": 5 },
            ])
                .then((data) => {
                    res.status(201).json({
                        status: "success",
                        data
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


export async function getAllBranch(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(ret => {

            var filterData = {}
            // iterate through key-value gracefully
            const obj = req.body;
            for (const [key, value] of Object.entries(obj)) {
                filterData[key] = value == 'true' ? true : value == 'false' ? false : value;
            }
            console.log("return...", ret)
            Branch.aggregate([
                // {
                //     $match: {
                //         branchid: ret.branchid
                //     }
                // },

                {
                    "$match": {
                        "branchid": { "$in": ret.branchid }
                    }
                },


                { $lookup: { from: "users", localField: "userid", foreignField: "_id", as: "user_info" } },
                { $unwind: "$user_info" },


                // { $match: filterData },
                {
                    $project: {
                        "_id": 1, "created_at": 1, "is_validated": 1, "is_active": 1, "name": 1, "address": 1, "description": 1, "userid": 1, "branchid": 1,
                        "user_info._id": 1, "user_info.username": 1, "user_info.usertype": 1,
                    }
                },
            ])
                .then((data) => {
                    res.status(201).json({
                        status: "success",
                        data
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
        User.find({})
            .then(function (result) {
                return result;
            })
            .then(function (result) {
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
        const id = req.params.id;
        const data = req.body;
        data.updated_at = new Date();
        Branch.findOneAndUpdate({ "branchid": id }, data, (error, doc) => {
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


export async function deleteBranch(req, res, next) {
    try {
        console.log(req.params)
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.params.id;

            Branch.deleteOne({ "branchid": id }, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Branch details deleted"
                    });
                } else {
                    res.status(422).json({
                        message: "Failed"
                    });
                }
            });

        })

    } catch (error) {
        next(error);
    }
}