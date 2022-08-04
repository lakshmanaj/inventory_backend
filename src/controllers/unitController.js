import Unit from "../models/unitModel.js";
import { tokendata } from '../utils/tokenKey.js'

export async function addUnit(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            req.body.userid = returnTokenData.userid;
            req.body.branchid = returnTokenData.branchid;
            req.body.created_at = new Date;

            console.log({ "_id": returnTokenData.branchid, "name": req.body })

            Unit.findOne({ "branchid": returnTokenData.branchid, productid: req.body.productid, name: req.body.name }, (err, catCount) => {
                if (catCount) {
                    console.log("exists")
                    res.status(422).json({
                        status: "success",
                        message: "Unit name already exist",
                    });
                } else {
                    console.log("not exists")
                    var createUnit = new Unit(req.body)
                    console.log("createUnit", createUnit)
                    createUnit.save((err, result) => {
                        console.log("error", err)
                        if (!err) {
                            res.status(201).json({
                                status: "success",
                                message: "Unit created successfuly",
                            });
                        }
                    })
                }


            })



        })
    } catch (error) {
        console.log(error)
        next(error);
    }
}


export async function updateUnit(req, res, next) {
    try {

        console.log("trigger")

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.query.id;
            const data = req.body;
            data.updated_at = new Date();

            Unit.findOneAndUpdate({ "_id": req.params.id, "branchid": returnTokenData.branchid }, data, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Unit details updated"
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

export async function deleteUnit(req, res, next) {
    try {
        console.log(req.params)
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.params.id;
            Unit.deleteOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Unit details deleted"
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

export async function getOneUnit(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.body.Unitid;
            Unit.findOne({ "_id": req.params.id, branchid: returnTokenData.branchid }, (error, doc) => {
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

export async function getAllUnit(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.params.Unitid;
            // Unit.find({ branchid: returnTokenData.branchid }, (error, doc) => {
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





            Unit.aggregate([
                //                 {
                //                     $match: {
                //                         "_id": id, branchid: returnTokenData.branchid
                //                     }
                //                 },
                // 
                {
                    $lookup: {
                        localField: "productid",
                        from: "products",
                        foreignField: "_id",
                        as: "product_info"
                    }
                },
                {
                    $unwind: "$product_info"
                },

            ]);

        })


    } catch (error) {
        next(error);
    }
}