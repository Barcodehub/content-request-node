const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const auth = require('../middlewares/auth');

router.post('/post/:postId', auth, likeController.togglePostLike);
router.post('/comment/:commentId', auth, likeController.toggleCommentLike);

module.exports = router;