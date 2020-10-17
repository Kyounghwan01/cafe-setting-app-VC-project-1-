const exchangeSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    required: true
  },
  buyer: {
    type: Schema.Types.ObjectId,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    },
  },
  River : {
    type : Schema.Types.ObjectId,
    ref: 'River'
  }
});
