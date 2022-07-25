import mongoose from "mongoose";
const { Schema, model } = mongoose;

const customerSchema = new Schema({
    branchid: {
        type: String,
    },
    name: {
        type: String,
    },
    mobile: {
        type: String,
    },
    address: {
        type: String,
    },
    userid: {
        type: String,
    },
    created_at: {
        type: Date, default: new Date(),
    },
    updated_at: {
        type: Date,
    }
});

customerSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

customerSchema.set("autoIndex", true);

const customer = model("customer", customerSchema);

export default customer;
