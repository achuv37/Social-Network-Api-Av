const { Thought, User } = require('../models');

const thoughtController = {
  // add thoughts
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  // get all thoughts
  getAllThought(req, res) {
    Thought.find({})
    // populate reactions
      .populate({
        path: 'reactions',
        select: '-__v'
      })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
  },
  // get a thought by id 
  getThoughtById({ params } , res) {
    Thought.findOne({_id: params.id })
    // populate reactions
      .populate({
        path: 'reactions',
        select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
        // If no Thoughts is found, send 404
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts found with this id!' });
            return;
          }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
  },
  // update thought by id 
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No Thoughts found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  },

  // Delete a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thoughts found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  }


}

module.exports = thoughtController;