import mongoose from "mongoose";
const { Schema, model } = mongoose;

const branchSchema = new Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    description: {
        type: String,
    },
    branchid: {
        type: String,
    },
    userid: {
        type: String,
    },
    created_at: {
        type: Date, default: new Date(),
    },
    updated_at: {
        type: Date, default: new Date(),
    },
    is_validated: {
        type: Boolean, default: false,
    },
    is_active: {
        type: Boolean, default: false,
    },
});

branchSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

branchSchema.set("autoIndex", true);

const branch = model("branches", branchSchema);

export default branch;
