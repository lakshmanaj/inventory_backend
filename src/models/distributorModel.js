import mongoose from "mongoose";
const { Schema, model } = mongoose;

const distributorSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    mobile: {
        type: String,
    },
    card: {
        type: String
    },
    branchid: {
        type: String
    },
    userid: {
        type: mongoose.Schema.ObjectId, required: true
    },
    created_at: {
        type: Date, default: new Date(),
    },
    updated_at: {
        type: Date,
    },
    is_validated: { // Will be true after verified by SA || AD
        type: Boolean, default: false,
    },
    is_active: { //active or not
        type: Boolean, default: true,
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
