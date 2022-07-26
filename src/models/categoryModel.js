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

categorySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

categorySchema.set("autoIndex", true);

const category = model("category", categorySchema);

export default category;
