import jwt from "jsonwebtoken";
import { convertToSeconds } from "./convertToSeconds";

export const tokengenerate = (
  email: string,
  accessTokenSecret: string,
  accessTokenExpiry: string | number,
  refreshTokenSecret: string,
  refreshTokenExpiry: string | number
) => {

  // Convert expiry strings to seconds if provided
  const accessTokenExpirySeconds =
    typeof accessTokenExpiry === "string"
      ? convertToSeconds(accessTokenExpiry)
      : accessTokenExpiry;


  // const refreshTokenExpirySeconds =
  //   typeof refreshTokenExpiry === "string"
  //     ? convertToSeconds(refreshTokenExpiry)
  //     : refreshTokenExpiry;


  const accessToken = jwt.sign(
    {
      email: email,
    },
    accessTokenSecret,
    {
      expiresIn: accessTokenExpiry,
    }
  );


  const refreshToken = jwt.sign(
    {
      email: email,
    },
    refreshTokenSecret,
    {
      expiresIn: refreshTokenExpiry,
    }
  );

  const currentTimestamp = new Date().getTime(); 
  const expiryTimestamp = currentTimestamp + accessTokenExpirySeconds * 1000;
  const expiryDate = new Date(expiryTimestamp);

  return { accessToken, refreshToken, expiryDate };
};

