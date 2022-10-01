const { Thought, User } = require('../models');

const thoughtController = {
    // Get Request for All Thoughts
    // Expected sourcing -> /api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'user',
                select: '-__v',
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // Get Request for individual Thoughts 
    // Expected sourcing -> /api/thoughts/:id
    getThoughtByID({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought was found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // Create a Thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            res.status(400).json(err);
        })
    },

    // Update existing Thought by ID
    updateThought({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete existing thought by ID
    deleteThought({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;