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
      let isAuthored = false
      if (post.userId==req.session.userId) {
        isAuthored = true;
      }
      res.render('post', {
        post,
        isAuthored,
        logged_in: req.session.logged_in,
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

  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('signup');
  });
  

  router.get('/post', withAuth, async (req, res) => {
    try {
      res.render('makepost', {
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/updatepost/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id)
      if(!postData) {
        return res.status(404).render('404');
      } 
      const post = postData.get({ plain: true });
      res.render('updatepost', {
        post,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.get('*', (req, res) => {
    res.status(404).render('404');
  });

  module.exports = router;