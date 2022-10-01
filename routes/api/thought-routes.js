const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtByID,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');
const { getUserByID } = require('../../controllers/user-controller');

router.route('/')
 .get(getAllThoughts)
 .post(createThought);

router.route('/:id')
.get(getThoughtByID)
.put(updateThought)
.delete(deleteThought);

module.exports = router;