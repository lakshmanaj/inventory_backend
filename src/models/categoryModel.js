import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
    },
    description: {
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

categorySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

categorySchema.set("autoIndex", true);

const category = model("category", categorySchema);

export default category;
