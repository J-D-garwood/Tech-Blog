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

  router.get('/post/:id', withAuth, async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        return res.status(404).render('404');
      }
      const specPostData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['dateCreated', 'comment'],
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          },
        ],
      });
      if(!specPostData) {
        return res.status(404).render('404');
      }
      const post = specPostData.get({ plain: true });

      res.render('post', {
        post,
        logged_in: req.sessionStore.logged_in,
      });
      //MORE TO GO HERE
    } catch (err) {
      console.log(err);
      return res.status(500).render('500');
    }
  })

  router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          userId: req.session.userId,
        },
      });

      const authoredPosts = postData.map((post) => post.get({ plain: true }));

      res.render('dashboard', {
        authoredPosts,
        logged_in: req.session.logged_in,
      })
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
    }

  });