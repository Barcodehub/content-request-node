const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/auth');

router.post('/', auth, commentController.createComment);
router.get('/:postId', auth, commentController.getComments);

module.exports = router;