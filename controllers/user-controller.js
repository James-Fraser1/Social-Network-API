const { User } = require('../models');

const userController = {

    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => {
                console.log('Get All Users')
                res.json(dbUserData)
            })

            .catch(err => {
                console.log(err);
                res.status(400).json(err.message);
            });
    },

    getUserByID({ params }, res) {
        console.log('hi line 16')
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                console.log('here')
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User was found with this ID' });
                    return;
                }
                console.log(dbUserData);
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID' });
                    return;
                }
            })
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userID },
            { $addToSet: { friends: params.friendID } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID' });
                    return;
                }

                User.findOneAndUpdate(
                    { _id: params.friendID },
                    { $addToSet: { friends: params.userID } },
                    { new: true, runValidators: true }
                )
                    .then(dbFriendData => {
                        if (!dbFriendData) {
                            res.status(404).json({ message: 'No User found with this ID' })
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userID },
            { $pull: { friends: params.friendID } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID' });
                    return;
                }

                User.findOneAndUpdate(
                    { _id: params.friendID },
                    { $pull: { friends: params.userID } },
                    { new: true, runValidators: true }
                )
                    .then(dbFriendData => {
                        if (!dbFriendData) {
                            res.status(404).json({ message: 'No User found with this friendId' })
                            return;
                        }
                        res.json({ message: 'Friend deleted' });
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    }
}

module.exports = userController;