import mongoose from "mongoose";
const { Schema, model } = mongoose;

const shopSchema = new Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    shopid: {
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

shopSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

shopSchema.set("autoIndex", true);

const shop = model("shop", shopSchema);

export default shop;
