import otpGenerator from "otp-generator";

export function otpGenerate() {
  return otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
  });
}
