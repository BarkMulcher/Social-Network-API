const { Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).jason(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => 
        !thought
        ? res.status(404).jason({ message: `No thought with that ID`})
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
};