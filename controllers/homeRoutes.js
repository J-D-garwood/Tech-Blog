const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        order: [['id', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });