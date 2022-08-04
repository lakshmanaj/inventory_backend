import mongoose from "mongoose";
const { Schema, model } = mongoose;

const invoiceSchema = new Schema({
    invoice_number: {
        type: String,
    },
    branchid: {
        type: String
    },
    userid: {
        type: mongoose.Schema.ObjectId, required: true
    },
    productid: {
        type: mongoose.Schema.ObjectId, required: true
    },
    price: {
        type: Number,
    },
    qty: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    created_at: {
        type: Date, default: new Date(),
    },
    updated_at: {
        type: Date,
    },

});

invoiceSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

invoiceSchema.set("autoIndex", true);

const invoice = model("invoice", invoiceSchema);

export default invoice;
