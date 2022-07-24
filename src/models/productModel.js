import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    code: {
        type: String,
    },
    barcode: {
        type: String,
    }, 
    qty: {
        type: String,
    }, 
    discount: {
        type: String,
    },
    cetegoryid: {
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
    },
    shopid: {
        type: String,
    },

});

productSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

productSchema.set("autoIndex", true);

const product = model("product", productSchema);

export default product;
