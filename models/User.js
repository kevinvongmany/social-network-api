const { Schema, model } = require('mongoose');
const { thoughtSchema } = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [thoughtSchema],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  // Set schema to use virtuals
  {
    toJSON: {
      getters: true,
    },
    friendCount: {
      virtuals: true,
    },
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model using the userSchema

const User = model('user', userSchema);

module.exports = User;
