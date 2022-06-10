const router = require('express').Router();

const {
  getAllThought,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// Set up GET all  at /api/thoughts
router
  .route('/')
  .get(getAllThought)
  

  // Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Set up POST at /api/thoughts/:userId 
router
  .route('/:userId')
  .post(addThought);

// Set up POST at /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// Set up DELETE at /api/thoughts/:thoughtId/:reactionId 
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)

module.exports = router;