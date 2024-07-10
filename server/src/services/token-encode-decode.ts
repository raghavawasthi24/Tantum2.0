import * as jwt from "jsonwebtoken";

export const tokenEncode = (
  email: string,
  tokenSecret: string,
  tokenExpiry: string
) => {
  const encodedToken = jwt.sign(
    {
      email: email,
    },
    tokenSecret,
    {
      expiresIn: tokenExpiry,
    }
  );

  return encodedToken
};

export const tokenDecode = (token: string, tokenSecret: string) => {
  const decodedToken = jwt.verify(token, tokenSecret);
  return decodedToken;
};
