const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./blog_postRoutes');

router.use('/users', userRoutes);

router.use('/blog_posts', postRoutes);

module.exports = router;