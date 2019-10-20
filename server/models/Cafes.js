const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')

const cafeSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  },
  arrangemenet: {
    type: Schema.Types.Mixed,
    default: [...Array(100)]
  },
  menu: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      category: {
        type: Schema.Types.ObjectId,
        required: true
      },
      desc: {
        type: String
      }
    }
  ],
  order: [
    {
      user: {
        type: Schema.Types.ObjectId,
        required: true
      },
      menu: [
        {
          id: { type: Schema.Types.ObjectId, required: true },
          name : {type : String, required: true},
          price : {type : Number, required: true},
          count: {
            type: Number,
            required: true
          }
        }
      ],
      created_at: {
        type: Date,
        default: moment().format('YYYY-MM-DDTHH:mm')
      },
      complete : {type : Boolean, default : false}
    }
  ]
});

module.exports = mongoose.model('Cafes', cafeSchema);
