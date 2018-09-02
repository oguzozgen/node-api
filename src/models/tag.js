import { dd } from 'dumper.js';
import mongoose, { Schema } from 'mongoose';

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  // eslint-disable-next-line camelcase
  user_id: {
    type: String,
    required: true,
  },
  // eslint-disable-next-line camelcase
  created_at: {
    type: Date,
    default: Date.now,
  },
  // eslint-disable-next-line camelcase
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
