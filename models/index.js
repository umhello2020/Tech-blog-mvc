const User = require('./user');
const Comment = require('./comment');
const Blog_Post = require('./blog_post');

Blog_Post.hasMnay(Comments, {
    foreignKey: 'blog_post_id',
});

Comment.belongsto(User, {
    foreignKey: 'blog_post_id'
});

module.exports = { User, Comment, Blog_Post };