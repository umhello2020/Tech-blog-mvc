const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const { format_date } = require('../utils/helpers');

class Blog_Post extends Model {
  // format the timestamp on the post
  formattedDateCreated() {
    return format_date(this.date_created);
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
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog_post',
  }
);

module.exports = Blog_Post;
