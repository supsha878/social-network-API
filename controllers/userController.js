const { User } = require('../models');

module.exports = {
    // GET all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json(err));
    },
    // GET a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST a new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err));
    },
    // PUT to update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found with that ID' })
                : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user found with that ID' })
                : res.status(200).json(user) //TODO delete thoughts
        )
        .catch((err) => res.status(500).json(err));
    },
    // POST to add a new friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user found with that ID' })
                : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // DELETE to remove a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user found with that ID' })
                : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
};