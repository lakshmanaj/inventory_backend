import jwt, { decode } from "jsonwebtoken";
const config = process.env;

export const tokendata = (token) => {
    return new Promise(function (resolve, reject) {
        try {
            token = token.split(" ")[1]
            if (!token) {
                throw new Error('Authentication failed!');
            }
            const verified = jwt.verify(token, process.env.TOKEN_KEY);
            resolve(verified)
        } catch (e) {
            reject('Invalid token !');
        }
    })
}

// export const userid = async (token) => {
//     const decoded = jwt.verify(token.split(" ")[1], config.TOKEN_KEY);
//     return decoded.user_id;
// }
// export const email = async (token) => {
//     console.log("tri")
//     const decoded = jwt.verify(token.split(" ")[1], config.TOKEN_KEY);
//     return decoded.email;
// }
// export const usertype = async (token) => {
//     const decoded = jwt.verify(token.split(" ")[1], config.TOKEN_KEY);
//     return decoded.usertype;
// }
// export const username = async (token) => {
//     const decoded = jwt.verify(token.split(" ")[1], config.TOKEN_KEY);
//     return decoded.username;
// }


// export const example1 = async (token) => {
//     return "Hello" + token;
// }
