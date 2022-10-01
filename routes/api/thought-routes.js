const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtByID,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router.route('/')
 .get(getAllThoughts)
 .post(createThought);

router.route('/:id')
.get(getThoughtByID)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtID/reactions')
.post(createReaction)

router.route('/:thoughtID/reactionID')
.delete(deleteReaction)

module.exports = router;