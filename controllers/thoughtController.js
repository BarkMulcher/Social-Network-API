const { Thought } = require('../models');

module.exports = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // get single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).jason({ message: `No thought with that ID` })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create new thought
    createNewThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },
    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: `no thought with this ID :()` })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete thought 
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId }
                .then((thought) =>
                    !thought
                        ? res
                            .status(404)
                            .json({ message: `No thought with this ID :()` })
                        : User.findOneAndUpdate(
                            { thought: req.params.thoughtId },
                            { $pull: { thought: req.params.thoughtId } },
                            { new: true }
                        )
                )
                .then((user) =>
                    !user
                        ? res.status(404).json({
                            message: `Thought deleted & no user found :()`,
                        })
                        : res.json({
                            message: `Thought deleted`
                        })
                )
        )
    },
    // create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: `No thought found with that ID :()` })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
                }
            )
    },
    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: `No thought found with that ID :()` })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
};