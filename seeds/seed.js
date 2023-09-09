const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json')


const seedDatabase = async () => {
    await sequelize.sync({ force: false });
  
    //seeding the database with users
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    //seeding the database with recipes
    const posts = await Post.bulkCreate(postData);

    const comments = await Comment.bulkCreate(commentData);
    process.exit(0);

  };
  
  seedDatabase();