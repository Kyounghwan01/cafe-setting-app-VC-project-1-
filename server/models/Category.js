const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category: [{
    name : {
      type : String,
      require : true
    }
  }]
});

module.exports = mongoose.model('Category', categorySchema);
