const {Schema, model, Types} = require('mongoose');
const moment = require('moment');

//ReactionSchema

// creating thoughtSchema
const ThoughtSchema = (
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) => moment(createdAtValue).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true
    },
    // use ReactionSchema to validate data for a reaction
    reactions: [ReactionsSchema]
  },

  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);
// virtual 'reactionCount' that retrieves the length of the thought's reactions array
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;

