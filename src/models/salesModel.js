import mongoose from "mongoose";
const { Schema, model } = mongoose;

const salesSchema = new Schema({
    invoice_number: {
        type: String,
    },
    branchid: {
        type: String,
    },
    total_discount: {
        type: String,
    },
    total_amount: {
        type: String,
    },
    userid: {
        type: String,
    },
    customerid: {
        type: String,
    },
    payment_type: {
        type: String,
    },
    created_at: {
        type: Date, default: new Date(),
    },
    updated_at: {
        type: Date,
    },

});

salesSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

salesSchema.set("autoIndex", true);

const sales = model("sales", salesSchema);

export default sales;
