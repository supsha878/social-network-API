const { Thought } = require('../models');

module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.status(200).json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // GET a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that id' })
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST a new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: req.body } },
                { runValidators: true, new: true }
            );
            return res.status(200).json(thought)
        })
        .catch((err) => res.status(500).json(err));
    },
    // PUT to update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID' })
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID' })
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST to create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID' })
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought found with that ID' })
                : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};