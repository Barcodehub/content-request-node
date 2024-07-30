const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

exports.sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const existingRequest = await FriendRequest.findOne({
      sender: req.user.id,
      receiver: receiverId,
      status: 'pending'
    });
    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }
    const friendRequest = await FriendRequest.create({
      sender: req.user.id,
      receiver: receiverId
    });
    res.status(201).json(friendRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.respondToFriendRequest = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest || friendRequest.receiver.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Friend request not found' });
    }
    friendRequest.status = status;
    await friendRequest.save();
    if (status === 'accepted') {
      await User.findByIdAndUpdate(friendRequest.sender, { $push: { friends: friendRequest.receiver } });
      await User.findByIdAndUpdate(friendRequest.receiver, { $push: { friends: friendRequest.sender } });
    }
    res.json(friendRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFriendRequests = async (req, res) => {
  try {
    const friendRequests = await FriendRequest.find({ receiver: req.user.id, status: 'pending' })
      .populate('sender', 'username');
    res.json(friendRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.removeFriend = async (req, res) => {
  try {
    const { friendId } = req.params;
    await User.findByIdAndUpdate(req.user.id, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: req.user.id } });
    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
