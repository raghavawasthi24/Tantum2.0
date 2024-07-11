"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokengenerate = void 0;
const jwt = require("jsonwebtoken");
const convertToSeconds_1 = require("./convertToSeconds");
const tokengenerate = (email, accessTokenSecret, accessTokenExpiry, refreshTokenSecret, refreshTokenExpiry) => {
    // Convert expiry strings to seconds if provided
    const accessTokenExpirySeconds = typeof accessTokenExpiry === "string"
        ? (0, convertToSeconds_1.convertToSeconds)(accessTokenExpiry)
        : accessTokenExpiry;
    // const refreshTokenExpirySeconds =
    //   typeof refreshTokenExpiry === "string"
    //     ? convertToSeconds(refreshTokenExpiry)
    //     : refreshTokenExpiry;
    const accessToken = jwt.sign({
        email: email,
    }, accessTokenSecret, {
        expiresIn: accessTokenExpirySeconds,
    });
    // const refreshToken = jwt.sign(
    //   {
    //     email: email,
    //   },
    //   refreshTokenSecret,
    //   {
    //     expiresIn: refreshTokenExpirySeconds,
    //   }
    // );
    // const currentTimestamp = new Date().getTime();
    // const expiryTimestamp = currentTimestamp + accessTokenExpirySeconds * 1000;
    // const expiryDate = new Date(expiryTimestamp);
    return { accessToken };
};
exports.tokengenerate = tokengenerate;
