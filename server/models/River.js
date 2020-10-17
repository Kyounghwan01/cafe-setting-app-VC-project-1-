const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RiverSchema = new Schema({
    name : {
      type : String,
      require : true
    }
});

module.exports = mongoose.model('River', RiverSchema);
