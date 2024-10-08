const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        get: (createdAtVal) => dateFormat(createdAtVal),
      },
    },
    {
      timestamps: true,
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: false,
    }
  );
  
module.exports = reactionSchema;
