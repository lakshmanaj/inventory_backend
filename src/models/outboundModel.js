import mongoose from "mongoose";
const { Schema, model } = mongoose;

const outboundSchema = new Schema({
    productid: {
        type: mongoose.Schema.ObjectId, required: true
    },
    branchid: {
        type: String
    },
    date: {
        type: String,
    },
    qty: {
        type: String,
    },
    userid: {
        type: mongoose.Schema.ObjectId, required: true
    },
    godownid: {
        type: mongoose.Schema.ObjectId, required: true
    },
    created_at: {
        type: Date, default: new Date(),
    },
    updated_at: { 
        type: Date,
    },

});

outboundSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

outboundSchema.set("autoIndex", true);

const outbound = model("outbound", outboundSchema);

export default outbound;
