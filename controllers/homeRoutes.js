const router = require('express').Router();
const { User, Blog_Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Blog_Post.findAll({
            include: [ User ],
        });
        console.log(postData)
        res.render('homepage', {
            postData
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
})



module.exports = router;