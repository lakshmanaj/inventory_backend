import mongoose from "mongoose";
const { Schema, model } = mongoose;

const brandSchema = new Schema({
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

brandSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

brandSchema.set("autoIndex", true);

const brand = model("brand", brandSchema);

export default brand;
