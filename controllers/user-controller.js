const { Thought, User } = require('../models');

const userController = {

    getAllUsers(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

    getUserByID({ params }, res) {
        User.findOne({ _id: params.id })
        .populate([
            { path: 'thoughts', 
            select: '-__v'},
            { path: 'friends', 
            select: '-__v'},
        ])
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User was found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    }
}

module.exports = userController;