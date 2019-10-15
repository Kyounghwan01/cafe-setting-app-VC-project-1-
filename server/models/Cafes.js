const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      }
    }
  ],
  order: [
    {
      user: {
        type: String,
        required: true
      },
      menu: [
        {
          type: Schema.Types.ObjectId,
          required: true
        }
      ],
      created_at: {
        type: Date,
        default: Date.new
      }
    }
  ]
});

module.exports = mongoose.model('Cafes', cafeSchema);
