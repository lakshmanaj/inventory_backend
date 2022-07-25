import Branch from "../models/branchModel.js";
import User from "../models/userModel.js";
import { getAll, getOne, deleteOne } from "./BaseController.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { tokendata } from '../utils/tokenKey.js'




export const getAllRecharge = getAll(User);
export const getRecharge = getOne(User);
export const deleteRecharge = deleteOne(User);
