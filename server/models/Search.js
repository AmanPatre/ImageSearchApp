const mongoose = require('mongoose');
const { Schema } = mongoose;

const searchSchema = new Schema({
  term: String,
  timestamp: Date,
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('searches', searchSchema);