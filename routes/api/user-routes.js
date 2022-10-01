const router = require('express').Router();

const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router.route('/')
 .get(getAllUsers)
 .post(createUser);

router.route('/:id')
.get(getUserByID)
.put(updateUser)
.delete(deleteUser);

router.route('./:userID/friends/friendID')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;