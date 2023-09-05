const router = require('express').Router();

// Import routers

const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

const postRoutes = require('./postRoutes');

router.use('/posts', postRoutes);

const commentRoutes = require('./commentRoutes');

router.use('/comment', commentRoutes);

module.exports = router;
