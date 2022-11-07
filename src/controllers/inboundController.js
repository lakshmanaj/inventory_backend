import Inbound from "../models/inboundModel.js";
import { tokendata } from '../utils/tokenKey.js'
import mongoose from 'mongoose';

export async function addInbound(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            req.body.userid = returnTokenData.userid;
            req.body.branchid = returnTokenData.branchid;
            req.body.created_at = returnTokenData.created_at;

            var createInbound = new Inbound(req.body)
            createInbound.save((err, result) => {
                if (!err) {
                    res.status(201).json({
                        status: "success",
                        message: "Inbound created successfuly",
                    });
                }
            })
        })
    } catch (error) {
        console.log(error)
        next(error);
    }
}


export async function updateInbound(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.params.id;
            const data = req.body;
            data.updated_at = new Date();

            Inbound.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(id), "branchid": returnTokenData.branchid }, data, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Inbound details updated"
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

export async function deleteInbound(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.params.id;
            Inbound.deleteOne({ "_id": mongoose.Types.ObjectId(id), branchid: returnTokenData.branchid }, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Inbound details deleted"
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

export async function getOneInboundByProduct(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const productid = req.params.id;
            Inbound.aggregate([
                {
                    $match: {
                        "productid": mongoose.Types.ObjectId(productid), branchid: returnTokenData.branchid
                    }
                },

                { $lookup: { localField: "userid", from: "users", foreignField: "_id", as: "user_info" } },
                { $unwind: "$user_info" },

                { $lookup: { localField: "godownid", from: "godowns", foreignField: "_id", as: "godown_info" } },
                { $unwind: "$godown_info" },

                { $lookup: { localField: "productid", from: "products", foreignField: "_id", as: "product_info" } },
                { $unwind: "$product_info" },

                {
                    $project: {
                        _id: 1,
                        branchid: 1,
                        created_at: 1,
                        qty: 1,
                        godownid: "$godown_info._id",
                        godownname: "$godown_info.name",
                        userid: "$user_info._id",
                        username: "$user_info.username",
                        productid:"$product_info._id",
                        productname:"$product_info.name",
                        created_at: { $dateToString: { format: "%d/%m/%Y", date: "$created_at" } }
                    }
                }
            ]).exec((error, result) => {
                if (!error) {
                    res.status(201).json({
                        data: result
                    });
                } else {
                    console.log(error)
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


export async function getOneInbound(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.body.inboundid;
            Inbound.findOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        data: doc
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

export async function getAllInbound(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.body.inboundid;
            Inbound.find({ branchid: returnTokenData.branchid }, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        data: doc
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