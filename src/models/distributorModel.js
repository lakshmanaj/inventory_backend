import mongoose from "mongoose";
const { Schema, model } = mongoose;

const distributorSchema = new Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    mobile: {
        type: String,
    },
    distributorid: {
        type: Array,
    },
    userid: {
        type: String,
    },
    created_at: {
        type: Date, default: new Date(),
    },
    updated_at: {
        type: Date,
    },
    is_validated: {
        type: Boolean, default: false,
    },
    is_active: {
        type: Boolean, default: false,
    },
});

distributorSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

distributorSchema.set("autoIndex", true);

const distributor = model("distributor", distributorSchema);

export default distributor;
