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

