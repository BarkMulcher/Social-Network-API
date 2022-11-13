const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find()
            .then((users) =>
                res.json(users))
            .catch((err) =>
                res.status(500).json(err));
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((users) =>
                !user
                    ? res.status(404)
                        .json({ message: `No user found with that ID :()` })
                    : res.json(users)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create new user
    createNewUser(req, res) {
        User.create(req.body)
            .then((user) =>
                res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404)
                        .json({ message: `No user found with that ID :()` })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete a user
    // w/ BONUS
    deleteUser(req, res) {
        User.findOneandDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404)
                        .json({ message: `No user found with that ID :()` })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: `User & their thoughts deleted :0` }))
            .catch((err) => res.status(500).json(err));
    },
    // add friend to user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user found witht his ID :()` })
                    : res.json(user)
            )
            .catch((err) =>
                res.status(500).json(err));
    },
    // remove friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: `No user found witht his ID :()` })
                    : res.json(user)
            )
            .catch((err) =>
                res.status(500).json(err));
    },
}