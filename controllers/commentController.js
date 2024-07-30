const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const comment = await Comment.create({ author: req.user.id, post: postId, content });
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate('author', 'username').sort('-createdAt');
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};