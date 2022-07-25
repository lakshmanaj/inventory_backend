import User from "../models/userModel.js";
import { getAll, getOne, deleteOne } from "./BaseController.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { tokendata } from '../utils/tokenKey.js'



export async function postFirstUserRegister(req, res, next) {
  try {
    const data = req.body;
    const exist = await User.find({ email: data.email });

    if (exist.length == 0) {
      const createData = await User.create({
        username: data.username,
        password: bcrypt.hashSync(data.password, 10),
        email: data.email,
        phone: data.phone,
        address: data.address,
        branchid: '',
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
  } catch (error) {
    console.log(error)
    next(error);
  }
}

export async function postLogin(req, res, next) {
  try {
    const data = req.body;
    console.log(data)
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(422).send({ message: "Email does not exist" });
    }
    if (user.length == 0) {
      return res.status(422).send({ message: "Email does not exist" });
    }
    if (user) {
      if (user.is_active == false)
        return res.status(422).send({ message: "We are precessing your data..." });
      if (user.is_blocked == true)
        return res.status(422).send({ message: "Sorry.. we are not processing your data, please contact your admin..." });
      var result = bcrypt.compareSync(req.body.password, user.password);
      if (result) {
        const token = jwt.sign(
          { userid: user._id, email: user.email, usertype: user.usertype, username: user.username, branchid: user.branchid },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        return res.json({ token: token, message: "Loggedin successfully" });
      } else {
        return res.status(422).send({ message: "Invalid password" });
      }
    }

  } catch (error) {
    console.log(error)
    next(error);
  }
}

export async function configureToken(req, res, next) {
  try {
    const data = req.body;
    console.log(data)

    const token =
      req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
    console.log("saved token", token)
    tokendata(token).then(decodedToken => {
      console.log("return token", decodedToken)
      decodedToken.branchid = data.branchid
      console.log("return token", decodedToken)

      const token2 = jwt.sign(
        {
          userid: decodedToken.userid,
          email: decodedToken.email,
          usertype: decodedToken.usertype,
          username: decodedToken.username,
          branchid: data.branchid
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "10h",
        }
      );

      return res.json({ token: token2, message: "Configured successfully" });
    });
    return;
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(422).send({ message: "Email does not exist" });
    }
    if (user.length == 0) {
      return res.status(422).send({ message: "Email does not exist" });
    }
    if (user) {
      if (user.is_active == false)
        return res.status(422).send({ message: "We are precessing your data..." });
      if (user.is_blocked == true)
        return res.status(422).send({ message: "Sorry.. we are not processing your data, please contact your admin..." });
      var result = bcrypt.compareSync(req.body.password, user.password);
      if (result) {
        const token = jwt.sign(
          { userid: user._id, email: user.email, usertype: user.usertype, username: user.username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        return res.json({ token: token, message: "Loggedin successfully" });
      } else {
        return res.status(422).send({ message: "Invalid password" });
      }
    }


  } catch (error) {
    console.log(error)
    next(error);
  }
}


export const getAllRecharge = getAll(User);
export const getRecharge = getOne(User);
export const deleteRecharge = deleteOne(User);
