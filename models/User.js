const {Schema, model} = require('mongoose');

// The following data to be stored when create a new user.
const UserSchema = new Schema(
  {
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]

},

{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
  }
);

// virtual 'friendCount' that retrieves the length of the user's friends array
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the user model using the UserSchema
const User = model('User', UserSchema);

// export the user model
module.exports = User;

