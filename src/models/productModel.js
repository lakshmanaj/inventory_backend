import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
    branchid: {
        type: String
    },
    categoryid: {
        type: mongoose.Schema.ObjectId, required: true
    },
    distributorid: {
        type: mongoose.Schema.ObjectId, required: true
    },
    userid: {
        type: mongoose.Schema.ObjectId, required: true
    },
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
    discount: {
        type: String,
    },
    created_at: {
        type: Date, default: new Date(),
    },
    updated_at: {
        type: Date,
    }

});

productSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

productSchema.set("autoIndex", true);

const product = model("product", productSchema);

export default product;
