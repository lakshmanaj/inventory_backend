import Product from "../models/productModel.js";
import Category from '../models/categoryModel.js'
import Unit from '../models/unitModel.js'

import { tokendata } from '../utils/tokenKey.js'

export async function addProduct(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            req.body.userid = returnTokenData.userid;
            req.body.branchid = returnTokenData.branchid;
            req.body.created_at = new Date();

            var createProduct = new Product(req.body)
            createProduct.save((err, result) => {
                if (!err) {
                    res.status(201).json({
                        status: "success",
                        message: "Product created successfuly",
                    });
                }
                else {
                    res.status(201).json({
                        status: "error",
                        message: err,
                    });
                }
            })
        })
    } catch (error) {
        console.log(error)
        next(error);
    }
}


export async function updateProduct(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.query.id;
            const data = req.body;
            data.updated_at = new Date();

            Product.findOneAndUpdate({ "_id": id, "branchid": returnTokenData.branchid }, data, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Product details updated"
                    });
                } else {
                    res.status(422).json({
                        message: "Failed"
                    });
                }
            });



        });



    } catch (error) {
        next(error);
    }
}

export async function deleteProduct(req, res, next) {
    try {
        console.log("trigger")

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.params.id;

            console.log("_id", id, "branchid", returnTokenData.branchid)
            Product.deleteOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Product details deleted"
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

export async function getOneProduct(req, res, next) {
    try {
        console.log("trigger")
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.params.id;
            // Product.findOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
            //     if (!error) {
            //         res.status(201).json({
            //             data: doc
            //         });
            //     } else {
            //         res.status(422).json({
            //             message: "Failed"
            //         });
            //     }
            // });

            Product.aggregate([
                {
                    $match: {
                        "_id": id, branchid: returnTokenData.branchid
                    }
                },

                {
                    $lookup: {
                        from: "userinfo",       // other table name
                        localField: "userId",   // name of users table field
                        foreignField: "userId", // name of userinfo table field
                        as: "user_info"         // alias for userinfo table
                    }
                },
                { $unwind: "$user_info" },     // $unwind used for getting data in object or for one record only

                // Join with user_role table
                {
                    $lookup: {
                        from: "userrole",
                        localField: "userId",
                        foreignField: "userId",
                        as: "user_role"
                    }
                },
                { $unwind: "$user_role" },


                // define which fields are you want to fetch
                {
                    $project: {
                        _id: 1,
                        email: 1,
                        userName: 1,
                        userPhone: "$user_info.phone",
                        role: "$user_role.role",
                    }
                }
            ]);

        })


    } catch (error) {
        next(error);
    }
}

export async function getAllProduct(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            Product.aggregate([
                {
                    $match: {
                        branchid: returnTokenData.branchid
                    }
                },

                { $lookup: { localField: "categoryid", from: "categories", foreignField: "_id", as: "category_info" } },
                { $unwind: "$category_info" },

                { $lookup: { localField: "distributorid", from: "distributors", foreignField: "_id", as: "distributor_info" } },
                { $unwind: "$distributor_info" },

                { $lookup: { localField: "userid", from: "users", foreignField: "_id", as: "user_info" } },
                { $unwind: "$user_info" },

                {
                    $project: {
                        "_id": 1, "dprice": 1, "sprice": 1, "discount": 1, "code": 1,"barcode": 1, "description": 1, "name": 1, "branchid": 1,
                        "distributor_info._id": 1, "distributor_info.name": 1,
                        "category_info._id": 1, "category_info.name": 1,
                        "user_info._id": 1, "user_info.username": 1, "user_info.usertype": 1,
                    }
                }






            ]).exec((error, result) => {
                if (!error) {
                    res.status(201).json({
                        data: result
                    });
                } else {
                    res.status(422).json({
                        message: "Failed"
                    });
                }
            })

        })


    } catch (error) {
        next(error);
    }
}