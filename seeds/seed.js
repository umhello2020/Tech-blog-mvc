const sequelize = require('../config/connection');
const { User, Blog_Post } = require('../models');

const userData = require('./userData.json');
const blog_postData = require('./blog_post_Data.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog_post of blog_postData) {
    await Blog_Post.create({
      ...blog_post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
