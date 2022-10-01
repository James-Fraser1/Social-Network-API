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
    }
}