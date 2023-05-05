const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const { format_date } = require('../utils/helpers');

class Blog_Post extends Model {
  // format the timestamp on the post
  formattedCreatedAt() {
    return format_date(this.createdAt);
  }
}

Blog_Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'blog_post',
  }
);

module.exports = Blog_Post;
