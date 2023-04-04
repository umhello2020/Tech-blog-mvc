const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog_Post extends Model {}

Blog_Post.init(
    {

    }
);

module.exports = Blog_Post;