import User from "../models/userModel.js";
import Group from "../models/groupModel.js";
import { isProcessed_Branch } from "../utils/mypromise.js";
import { getAll, getOne, deleteOne } from "./BaseController.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { tokendata } from '../utils/tokenKey.js'

var Is_GroupPromise = () => (
  new Promise((resolve, reject) => {
    Group.find({})
      .then(function (result) {
        return result;
      })
      .then(function (result) {
        resolve(result);
      });
  })
);

var CreateGroupPromise = () => (
  new Promise((resolve, reject) => {
    const createGroup = new Group({
      groupid: "GROUP001"
    })
    createGroup.save((err, result) => {
      if (!err) {
        resolve(result)
      } else {
        console.log(err)
      }
    })
  })
);


var CreateGroupPromise = () => (
  new Promise((resolve, reject) => {
    const createGroup = new Group({
      groupid: "GROUP001"
    })
    createGroup.save((err, result) => {
      if (!err) {
        resolve(result)
      } else {
        console.log(err)
      }
    })
  })
);

async function register(data, res, groupid) {
  const exist = await User.find({ email: data.email });

  if (exist.length == 0) {
    const createData = await User.create({
      username: data.username,
      password: bcrypt.hashSync(data.password, 10),
      email: data.email,
      phone: data.phone,
      address: data.address,
      groupid: groupid,
      usertype: "SA"
    });

    res.status(201).json({
      status: "success",
      message: "User Created Successfuly",
    });
  } else {
    res.status(422).json({
      status: "Error",
      message: "User Already Exist",
    });
  }
}

export async function postFirstUserRegister(req, res, next) {
  try {

    var result = await (Is_GroupPromise());

    if (result.length === 0) {
      var result2 = await (CreateGroupPromise())
      register(req.body, res, result2.groupid)
    } else if (result.length > 0) {
      var countDoc = result.length
      var newGroupid = "GROUP00" + countDoc;
      var n = 1;
      for (var i = 0; i < n; i++) {
        var isExistGroup = await Group.findOne({ "groupid": newGroupid }).exec();
        if (isExistGroup) {
          countDoc = countDoc + 1
          newGroupid = "GROUP00" + countDoc;
          n = n + 1;
        } else {
          n = 0;
          Group.create({
            groupid: newGroupid
          }, function (err, success) {
            if (!err) {
              register(req.body, res, success.groupid)
              // User.updateOne(
              //   { "_id": returnTokenData.userid },
              //   { $push: { branchid: [newGroupid] } },
              //   function (err, result) {
              //     if (err) {
              //       res.send(err);
              //     } else {
              //       res.status(201).json({
              //         status: "success",
              //         message: "Group created successfuly",
              //       });
              //     }
              //   }
              // );
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

export async function postLogin(req, res, next) {

  const data = req.body;

  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(422).send({ message: "Email does not exist" });
    }
    if (user.length == 0) {
      return res.status(422).send({ message: "Email does not exist" });
    }
    if (user) {

      if (user.is_validated == false)
        return res.status(422).send({ message: "We are precessing your data..." });

      if (user.is_active == false)
        return res.status(422).send({ message: "Your account is not active" });

      if (user.is_blocked == true)
        return res.status(422).send({ message: "Sorry.. we are not processing your data, please contact your admin..." });
      var result = bcrypt.compareSync(req.body.password, user.password);

      if (result) {
        User.aggregate([
          {
            $match: {
              email: data.email
            }
          },
          {
            $lookup: {
              from: "branches",
              localField: "branchcode",
              foreignField: "branchcode",
              as: "branch_info",
            },
          },
          {
            $unwind: "$branch_info",
          }
        ])
          .then((response) => {
            const token = jwt.sign(
              {
                userid: user._id,
                email: user.email,
                usertype: user.usertype,
                username: user.username,
                branchcode: user.branchcode,
                groupid: user.groupid,
              },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            if (user.usertype == "SA") {
              return res.json({ page: user.branchcode.length == 0 ? '/stepper' : '/branch/list/card', token: token, message: "Loggedin successfully" });
            } else {
              return res.json({ token: token, message: "Loggedin successfully" });
            }

          })
          .catch((error) => {
            res.status(422).json({
              status: "error",
              error
            });
          });
      } else {
        return res.status(422).send({ message: "Invalid password" });
      }
    }

  } catch (error) {
    console.log(error)
    next(error);
  }
}


export async function ChangePassword(req, res, next) {
  try {
    const data = req.body;


    const token =
      req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
    tokendata(token).then(decodedToken => {


      User.findOne({ email: decodedToken.email }, function (err, user) {
        if (!user) {
          return res.status(422).send({ message: "Email does not exist" });
        }
        if (user.length == 0) {
          return res.status(422).send({ message: "Email does not exist" });
        }
        if (user) {
          var result = bcrypt.compareSync(data.oldpassword, user.password);

          if (result) {
            User.findOneAndUpdate({ "email": decodedToken.email }, { password: data.password }, (error, doc) => {
              if (!error) {
                res.status(201).json({
                  message: "Password changed successfully"
                });
              } else {
                res.status(422).json({
                  message: "Failed"
                });
              }
            });
          } else {
            return res.status(422).send({ message: "Old password is not matched" });
          }
        }
      });


    })


  } catch (error) {
    console.log(error)
    next(error);
  }
}


export async function configureToken(req, res, next) {
  try {
    const data = req.body;
    isProcessed_Branch(data).then(response => {

      const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
      tokendata(token).then(decodedToken => {

        decodedToken.branchid = data.branchid
        const token2 = jwt.sign(
          {
            userid: decodedToken.userid,
            email: decodedToken.email,
            usertype: decodedToken.usertype,
            username: decodedToken.username,
            branchid: data.branchid,
            branchcode: decodedToken.branchcode,
            groupid: decodedToken.groupid
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "10h",
          }
        );
        return res.json({ token: token2, message: "Configured successfully" });
      });
    }).catch(err => {
      return res.status(422).send(err);
    })
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    console.log("req. paramssss", req.params)
    const result = await User.findOne({ "_id": req.params.id });

    if (!result) {
      res.status(200).json({
        status: "error",
      });
    }

    res.status(200).json({
      status: "success",
      data: [
        {
          username: result.username,
          email: result.email,
          phone: result.phone,
          address: result.address,
          usertype: result.usertype,
          gender: result.gender,
          branchcode: result.branchcode,
          groupid: result.groupid
        }
      ], result
    });
  } catch (error) {
    next(error);
  }
}

export const getAllRecharge = getAll(User);
export const deleteRecharge = deleteOne(User);
