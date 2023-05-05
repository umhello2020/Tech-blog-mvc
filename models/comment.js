const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');
const BlogPost = require('./blog_post');

class Comment extends Model {
     // format the timestamp on the post
  formattedDateCreated() {
    return format_date(this.date_created);
  }
}

Comment.init(
    {
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
        blog_post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: BlogPost,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);


module.exports = Comment;