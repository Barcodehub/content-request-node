const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const auth = require('../middlewares/auth');

router.post('/request', auth, friendController.sendFriendRequest);
router.post('/respond', auth, friendController.respondToFriendRequest);
router.get('/requests', auth, friendController.getFriendRequests);

module.exports = router;