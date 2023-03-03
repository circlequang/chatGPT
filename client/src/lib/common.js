//Checking the crypto module
var crypto = require('crypto');
const API = require("../models/API");
var c_algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var c_key = '43ko5u3ghudfnfow';

class Common {
   static async getChatAPI() {
      let cnt = await API.countDocuments();
      let index = Math.floor(Math.random() * (cnt-1)) +1;
      let api = await API.findOne({index: index});

      return api.api_key;
   }

   //Encrypting text
   static encrypt(text) {
      let cipher = crypto.createCipher(c_algorithm, c_key);  
      let encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
      return encrypted;
   }

   // Decrypting text
   static decrypt(text) {
      let decipher = crypto.createDecipher(c_algorithm, c_key);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
   }
}

module.exports = Common;