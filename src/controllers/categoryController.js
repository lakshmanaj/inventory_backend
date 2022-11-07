import Category from "../models/categoryModel.js";
import { tokendata } from '../utils/tokenKey.js'

export async function addCategory(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            req.body.userid = returnTokenData.userid;
            req.body.branchid = returnTokenData.branchid;
            req.body.created_at = new Date;


            Category.findOne({ "branchid": returnTokenData.branchid, name: req.body.name }, (err, catCount) => {
                if (catCount) {
                    res.status(422).json({
                        status: "success",
                        message: "Category name already exist",
                    });
                } else {

                    var createCategory = new Category(req.body)
                    createCategory.save((err, result) => {
                        if (!err) {
                            res.status(201).json({
                                status: "success",
                                message: "Category created successfuly",
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


export async function updateCategory(req, res, next) {
    try {


        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.query.id;
            const data = req.body;
            data.updated_at = new Date();

            Category.findOneAndUpdate({ "_id": req.params.id, "branchid": returnTokenData.branchid }, data, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Category details updated"
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

export async function deleteCategory(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.params.id;
            Category.deleteOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Category details deleted"
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

export async function getOneCategory(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.body.Categoryid;
            Category.findOne({ "_id": req.params.id, branchid: returnTokenData.branchid }, (error, doc) => {
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

export async function getAllCategory(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.body.Categoryid;
            // Category.find({ branchid: returnTokenData.branchid }, (error, doc) => {
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


            Category.aggregate([
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

export async function getAllCategoryNameList(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {
            const id = req.body.Categoryid;
            Category.aggregate([
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

export async function getAllCategoryWithLimit(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            Category.aggregate([
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