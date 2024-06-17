const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
    translate: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false }
);

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
