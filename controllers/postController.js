const Post = require('../models/Post');
const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

exports.createPost = async (req, res) => {
  try {
    const { content, privacy } = req.body;
    const post = await Post.create({ author: req.user.id, content, privacy });
    await User.findByIdAndUpdate(req.user.id, { $push: { posts: post._id } });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends');
    const friendIds = user.friends.map(friend => friend._id);
    const posts = await Post.find({
      $or: [
        { author: req.user.id },
        { author: { $in: friendIds }, privacy: 'friends' },
        { privacy: 'public' }
      ]
    }).populate('author', 'username').sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.sharePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (!post.shares.includes(req.user.id)) {
      post.shares.push(req.user.id);
      await post.save();
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getNewsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends');
    const friendIds = user.friends.map(friend => friend._id);
    const posts = await Post.find({
      $or: [
        { author: { $in: friendIds } },
        { author: req.user.id },
        { privacy: 'public' }
      ]
    }).populate('author', 'username').sort('-createdAt');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePostPrivacy = async (req, res) => {
  try {
    const { postId } = req.params;
    const { privacy } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: postId, author: req.user.id },
      { privacy },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found or you are not the author' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};