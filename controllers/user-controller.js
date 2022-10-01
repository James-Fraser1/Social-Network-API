const { Thought, User } = require('../models');

const userController = {

    getAllUsers(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

}

module.exports = userController;