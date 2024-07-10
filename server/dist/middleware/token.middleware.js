"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_js_1 = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    /**  token must beign with Bearer
     e.g Bearer eryr******bdwjve */
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer") {
        jwt.verify(req.headers.authorization.split(" ")[1], process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                console.log(err);
                return res.status(401).send("Invalid Token");
                next();
            }
            else {
                console.log(decode.email);
                user_model_js_1.default.findOne({
                    email: decode.email,
                })
                    .then((user) => {
                    req.user = user;
                    next();
                })
                    .catch((err) => {
                    console.log(err);
                    next();
                });
            }
        });
    }
    else {
        return res.status(401).send("Invalid Token");
    }
};
exports.default = verifyToken;
