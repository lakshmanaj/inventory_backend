import Customer from "../models/customerModel.js";
import { tokendata } from '../utils/tokenKey.js'

export async function addCustomer(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            req.body.userid = returnTokenData.userid;
            req.body.branchid = returnTokenData.branchid;
            req.body.created_at = returnTokenData.created_at;

            var createCustomer = new Customer(req.body)
            createCustomer.save((err, result) => {
                if (!err) {
                    res.status(201).json({
                        status: "success",
                        message: "Customer created successfuly",
                    });
                }
            })
        })
    } catch (error) {
        console.log(error)
        next(error);
    }
}


export async function updateCustomer(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.params.id;
            const data = req.body;
            data.updated_at = new Date();

            Customer.findOneAndUpdate({ "_id": id, "branchid": returnTokenData.branchid }, data, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Customer details updated"
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

export async function deleteCustomer(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.params.id;

            Customer.deleteOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Customer details deleted"
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

export async function getOneCustomer(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.body.customerid;
            Customer.findOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
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

export async function getAllCustomer(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.body.customerid;
            Customer.find({ branchid: returnTokenData.branchid }, (error, doc) => {
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