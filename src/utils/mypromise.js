import Branch from "../models/branchModel.js";

export const isProcessed_Branch = (data) => (
    new Promise((resolve, reject) => {
        Branch.findOne({ "_id": data.branchid }, (err, result) => {
            if (err) {
                console.log("error", err)
                reject({ message: err });
                return;
            } if (result) {
                if (result.is_validated == false) {
                    reject({ message: "Branch is not validated" });
                }
                if (result.is_active == false) {
                    reject({ message: "Branch is not active" });
                }
                resolve(result);
            }
            if (!result) {
                reject({ message: "Branch is not identified" });
            }
        })
    })
);