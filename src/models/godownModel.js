import mongoose from "mongoose";
const { Schema, model } = mongoose;

const godownSchema = new Schema({
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

godownSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

godownSchema.set("autoIndex", true);

const godown = model("godown", godownSchema);

export default godown;
