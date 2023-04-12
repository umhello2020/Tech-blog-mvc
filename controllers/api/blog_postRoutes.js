const router = require('express').Router();
const { Blog_Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
       const newPost = await Blog_Post.create({ 
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
       })
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;