import mongoose from "mongoose";
const { Schema, model } = mongoose;

const unitSchema = new Schema({
    name: {
        type: String,
    },
    qty: {
        type: Number,
    },
    productid: {
        type: mongoose.Schema.ObjectId, required: true
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
    branchid: {
        type: String
    },

});

unitSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

unitSchema.set("autoIndex", true);

const unit = model("unit", unitSchema);

export default unit;
