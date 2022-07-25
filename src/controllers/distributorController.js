import Branch from "../models/branchModel.js";
import User from "../models/userModel.js";
import Distributor from "../models/distributorModel.js";
import { getAll, getOne, deleteOne } from "./BaseController.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { tokendata } from '../utils/tokenKey.js'

export async function addDistributor(req, res, next) {
    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            req.body.userid = returnTokenData.userid;
            req.body.branchid = returnTokenData.branchid;
            req.body.created_at = returnTokenData.created_at;

            console.log("data..", req.body)
            var createDistributor = new Distributor(req.body)
            createDistributor.save((err, result) => {
                if (!err) {
                    res.status(201).json({
                        status: "success",
                        message: "Distributor created successfuly",
                    });
                }
            })
        })
    } catch (error) {
        console.log(error)
        next(error);
    }
}


export async function updateDistributor(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.query.id;
            const data = req.body;
            data.updated_at = new Date();
            console.log("data...", data)

            Distributor.findOneAndUpdate({ "_id": id, "branchid": returnTokenData.branchid }, data, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Distributor details updated"
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

export async function deleteDistributor(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.query.id;
            data.updated_at = new Date();
            Distributor.deleteOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
                if (!error) {
                    res.status(201).json({
                        message: "Distributor details deleted"
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

export async function getOneDistributor(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {

            const id = req.body.distributorid;
            Distributor.findOne({ "_id": id, branchid: returnTokenData.branchid }, (error, doc) => {
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

export async function getAllDistributor(req, res, next) {
    try {

        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
        tokendata(token).then(returnTokenData => {


            const id = req.body.distributorid;
            Distributor.find({ branchid: returnTokenData.branchid }, (error, doc) => {
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