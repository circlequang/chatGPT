//Checking the crypto module
const { encryptString, decryptString } = require('encrypt-string');
const API = require("../models/API");
var c_password = '43ko5u3ghudfnfow';

class Common {
   static async getChatAPI() {
      let cnt = await API.countDocuments();
      let index = Math.floor(Math.random() * cnt) +1;
      if(index < 1) index = 1;
      if(index > cnt) index = cnt;
      let api = await API.findOne({index: index});
      return api.api_key;
   }

   //Encrypting text
   static async encrypt(text) {
      let encrypted = await encryptString(text, c_password);
      return encrypted;
   }

   // Decrypting text
   static async decrypt(text) {
      let decrypted = await decryptString(text, c_password);

      return decrypted;
   }
}

module.exports = Common;