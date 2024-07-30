const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

router.post('/', auth, postController.createPost);
router.get('/', auth, postController.getPosts);
router.post('/:postId/share', auth, postController.sharePost);
router.get('/news-feed', auth, postController.getNewsFeed);
router.patch('/:postId/privacy', auth, postController.updatePostPrivacy);

router.delete('/:postId', auth, postController.deletePost);
router.delete('/:commentId', auth, commentController.deleteComment);
router.delete('/:type/:id', auth, likeController.removeLike);
router.delete('/:friendId', auth, friendController.removeFriend);
router.delete('/account', auth, userController.deleteAccount);

module.exports = router;