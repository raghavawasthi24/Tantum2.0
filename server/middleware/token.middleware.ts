import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { UserSchema } from "../types/user";

const verifyToken = (req: any, res: any, next: NextFunction) => {
  /**  token must beign with Bearer
   e.g Bearer eryr******bdwjve */

  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: jwt.VerifyErrors | null, decode: any) => {
        if (err) {
          console.log(err);
          return res.status(401).send("Invalid Token");
          next();
        } else {
          console.log(decode.email);
          User.findOne({
            email: decode.email,
          })
            .then((user: UserSchema | null) => {
              req.user = user;
              next();
            })
            .catch((err: any) => {
              console.log(err);
              next();
            });
        }
      }
    );
  } else {
    return res.status(401).send("Invalid Token");
  }
};

export default verifyToken;
