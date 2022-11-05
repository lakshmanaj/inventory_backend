import mongoose from "mongoose";
const { Schema, model } = mongoose;

const groupSchema = new Schema({
    groupid: {
        type: String,
    },
    branchid: {
        type: mongoose.Schema.ObjectId
    },
    branchcode: {
        type: String
    },
    userid: {
        type: mongoose.Schema.ObjectId
    },
    created_at: {
        type: Date, default: new Date(),
    },
    updated_at: {
        type: Date, default: new Date(),
    },
});

groupSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

groupSchema.set("autoIndex", true);

const group = model("groupes", groupSchema);

export default group;
