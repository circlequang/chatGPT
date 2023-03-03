const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({

      src: {
        type: String,
      },
      api_key: {
        type: String,

      },
      index: {
        type: Number,
      },
      localtion_index : {
        type: Number,
      }
    
});

module.exports = new mongoose.model("apis", querySchema,"apis");
