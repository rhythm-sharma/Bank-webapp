import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";

const SECRET_KEY = "my secret key";

const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);
    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
  },
});

const secureSessionStorage = new SecureStorage(sessionStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);
    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
  },
});

const getRandomNumber = (digit) => {
  return Math.random().toFixed(digit).split(".")[1];
};

function User(username, name, password) {
  const names = [
    "Leyton Whiteley",
    "Gurdeep Black",
    "Aine Fowler",
    "Tillie Holder",
  ];

  return {
    username: username,
    name: name,
    password: password,
    from: [{ name: name, accountNumber: getRandomNumber(10) }],
    to: [
      { name: names[0], accountNumber: getRandomNumber(10) },
      { name: names[1], accountNumber: getRandomNumber(10) },
      { name: names[2], accountNumber: getRandomNumber(10) },
      { name: names[3], accountNumber: getRandomNumber(10) },
    ],
    // Schema
    // { date: "", beneficiary: "", paymentType: "", amount: "" },
    transaction: [],
    // Schema
    // { date: "", document: "", preview: "", amount: "", status: "" },
    capital: [],
    balance: getRandomNumber(5),
    profileURL: `https://robohash.org/${getRandomNumber(5)}?set=set5`,
  };
}

export { secureStorage, secureSessionStorage, User };

// secureStorage.setItem(key, value);
// secureStorage.getItem(key);
// secureStorage.removeItem(key);
