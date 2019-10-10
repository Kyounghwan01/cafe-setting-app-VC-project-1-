const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cafeSchema = new Schema({
  arrangemenet: [
    {
      type: String,
      default: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    }
  ],
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
        required: true,
        ref: 'Category'
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
          required: true,
          ref: 'Cafe'
        }
      ],
      created_at: {
        type: Date,
        default: Date.new
      }
    }
  ]
});

module.exports = mongoose.model('Cafe', cafeSchema);
