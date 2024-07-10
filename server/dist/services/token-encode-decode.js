"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDecode = exports.tokenEncode = void 0;
const jwt = require("jsonwebtoken");
const tokenEncode = (email, tokenSecret, tokenExpiry) => {
    const encodedToken = jwt.sign({
        email: email,
    }, tokenSecret, {
        expiresIn: tokenExpiry,
    });
    return encodedToken;
};
exports.tokenEncode = tokenEncode;
const tokenDecode = (token, tokenSecret) => {
    const decodedToken = jwt.verify(token, tokenSecret);
    return decodedToken;
};
exports.tokenDecode = tokenDecode;
