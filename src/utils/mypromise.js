import Branch from "../models/branchModel.js";

export const isProcessed_Branch = (data) => (
    new Promise((resolve, reject) => {
        console.log("is processed branch id", data.branchid)
        Branch.findOne({ "branchid": data.branchid })
            .then(function (result) {
                return result;
            })
            .then(function (result) {
                if (result.is_validated == false) {
                    reject({ message: "Branch is not validated" });
                }
                if (result.is_active == false) {
                    reject({ message: "Branch is not active" });
                }
                resolve(result);
            });
    })
);