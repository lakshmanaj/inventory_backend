import Category from "../models/categoryModel.js";
import { tokendata } from '../utils/tokenKey.js'

export async function addCategory(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            req.body.userid = returnTokenData.userid;
            req.body.branchid = returnTokenData.branchid;
            req.body.created_at = returnTokenData.created_at;

            console.log("data..", req.body)
            var createCategory = new Category(req.body)
            createCategory.save((err, result) => {
                if (!err) {
                    res.status(201).json({
                        status: "success",
                        message: "Category created successfuly",
                    });
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
            console.log("data...", data)

            Category.findOneAndUpdate({ "_id": id, "branchid": returnTokenData.branchid }, data, (error, doc) => {
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

            const id = req.query.id;
            data.updated_at = new Date();
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
            Category.findOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
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
            Category.find({ branchid: returnTokenData.branchid }, (error, doc) => {
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