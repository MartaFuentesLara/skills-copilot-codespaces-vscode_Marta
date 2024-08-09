// Create web server for comment

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');

// POST - Create a comment
router.post('/comments', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const comment = new Comment(req.body);
        comment.author = user;
        await comment.save();
        res.redirect(`/posts/${req.body.post}`);
    } catch (e) {
        console.log(e);
        res.redirect('/posts');
    }
});

// GET - Edit comment
router.get('/comments/:id/edit', isLoggedIn, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.render('comments/edit', { comment });
    } catch (e) {
        console.log(e);
        res.redirect('/posts');
    }
});

// PUT - Update comment
router.put('/comments/:id', isLoggedIn, async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/posts/${req.body.post}`);
    } catch (e) {
        console.log(e);
        res.redirect('/posts');
    }
});

// DELETE - Delete comment
router.delete('/comments/:id', isLoggedIn, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.redirect(`/posts/${req.body.post}`);
    } catch (e) {
        console.log(e);
        res.redirect('/posts');
    }
});

module.exports = router;
