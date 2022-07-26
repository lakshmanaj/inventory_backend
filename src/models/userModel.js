import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [false, "Required name"],
    },
    password: {
        type: String,
        required: [false, "Required password"],
    },
    groupid: {
        type: String,
        required: [false, "Required groupid"],
    },
    email: {
        type: String,
        required: [false, "Required email address"],
    },
    phone: {
        type: String,
        required: [false, "Required mobile number"],
    },
    branchcode: {
        type: Array,
        required: [false, "Required branch code"],
    },
    usertype: {
        type: String,
        required: [false, "Required usertype"],
    },
    address: {
        type: String,
        required: [false, "Required address"],
    },
    created_at: {
        type: Date, default: new Date(),
        required: [false, "Required date"],
    },
    updated_at: {
        type: Date,
        required: [false, "Required date"],
    },
    token: {
        type: String, default: '',
        required: [false, "Required token"],
    },
    is_online: {
        type: Boolean, default: false,
        required: [false, "Required isActive"],
    },
    is_active: {
        type: Boolean, default: false,
        required: [false, "Required isActive"],
    },
    is_validated: {
        type: Boolean, default: false,
        required: [false, "Required isValidated"],
    },
    reference: {
        type: String,
        required: [false, "Required reference"],
    },
    paidamount: {
        type: Number,
        required: [false, "Required amount"],
    },
    lastlogin: {
        type: Date,
        required: [false, "Required login"],
    }

});

userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

userSchema.set("autoIndex", true);

const user = model("user", userSchema);

export default user;
