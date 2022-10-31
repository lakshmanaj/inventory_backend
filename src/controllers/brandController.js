import Brand from "../models/brandModel.js";
import { tokendata } from '../utils/tokenKey.js'

export async function addBrand(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            req.body.userid = returnTokenData.userid;
            req.body.branchid = returnTokenData.branchid;
            req.body.created_at = new Date;

            console.log({ "_id": returnTokenData.branchid, "name": req.body.name })

            Brand.findOne({ "branchid": returnTokenData.branchid, name: req.body.name }, (err, catCount) => {
                if (catCount) {
                    res.status(422).json({
                        status: "success",
                        message: "Brand name already exist",
                    });
                } else {

                    var createBrand = new Brand(req.body)
                    createBrand.save((err, result) => {
                        if (!err) {
                            res.status(201).json({
                                status: "success",
                                message: "Brand created successfuly",
                            });
                        } else {
                            res.status(422).json({
                                status: "error",
                                message: err,
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


export async function updateBrand(req, res, next) {
    try {

        console.log("trigger")

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.query.id;
            const data = req.body;
            data.updated_at = new Date();

            Brand.findOneAndUpdate({ "_id": req.params.id, "branchid": returnTokenData.branchid }, data, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Brand details updated"
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

export async function deleteBrand(req, res, next) {
    try {
        console.log(req.params)
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.params.id;
            Brand.deleteOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Brand details deleted"
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

export async function getOneBrand(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.body.Brandid;
            Brand.findOne({ "_id": req.params.id, branchid: returnTokenData.branchid }, (error, doc) => {
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

export async function getAllBrand(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.body.Brandid;
          
            Brand.aggregate([
                {
                    $match: {
                        branchid: returnTokenData.branchid
                    }
                },

                {
                    $lookup: {
                        from: "users",       // other table name
                        localField: "userid",   // name of users table field
                        foreignField: "_id", // name of userinfo table field
                        as: "user_info"         // alias for userinfo table
                    }
                },
            ]).then((data) => {
                res.status(201).json({
                    colomns: [
                        {
                            label: "Name",
                            value: "name"
                        },
                        {
                            label: "Description",
                            value: "description"
                        }
                    ],
                    data
                });
            })
                .catch((error) => {
                    console.log(error);
                });
            ;

        })


    } catch (error) {
        next(error);
    }
}

export async function getAllBrandNameList(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {
            const id = req.body.Brandid;
            Brand.aggregate([
                {
                    $match: {
                        branchid: returnTokenData.branchid
                    }
                },

                {
                    $lookup: {
                        from: "users",       // other table name
                        localField: "userid",   // name of users table field
                        foreignField: "_id", // name of userinfo table field
                        as: "user_info"         // alias for userinfo table
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1
                    }
                }
            ]).then((data) => {
                res.status(201).json({
                    data
                });
            })
                .catch((error) => {
                    console.log(error);
                });
            ;

        })


    } catch (error) {
        next(error);
    }
}

export async function getAllBrandWithLimit(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            Brand.aggregate([
                {
                    $match: {
                        branchid: returnTokenData.branchid
                    }
                },

                {
                    $lookup: {
                        from: "users",       // other table name
                        localField: "userid",   // name of users table field
                        foreignField: "_id", // name of userinfo table field
                        as: "user_info"         // alias for userinfo table
                    }
                },
                {
                    "$limit": 5
                }
            ]).then((data) => {
                res.status(201).json({
                    data,
                    colomns: [
                        {
                            label: "Name",
                            value: "name"
                        },
                        {
                            label: "Description",
                            value: "description"
                        }
                    ]
                });
            })
                .catch((error) => {
                    console.log(error);
                });
            ;

        })


    } catch (error) {
        next(error);
    }
}