import CryptoJS from "crypto-js";

export const encryptedString = (text) =>
  CryptoJS.AES.encrypt(JSON.stringify(text), process.env.REACT_APP_SECRET_KEY)
    .toString()
    .replaceAll("+", "jCdG");

export const decryptedString = (text) =>
  JSON.parse(
    CryptoJS.AES.decrypt(
      text.replaceAll("jCdG", "+"),
      process.env.REACT_APP_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8)
  );
