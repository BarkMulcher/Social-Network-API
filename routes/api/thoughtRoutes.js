const router = require('express').Router();

const {
    getSingleThought,
    getAllThoughts,
    createThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;
