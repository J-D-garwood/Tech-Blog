const router = require('express').Router();
const { Recipe } = require('../../models');
const Post = require('../../models/Post');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePostData = await Post.update(
        {
            title: req.body.title,
            contents: req.body.contents,
        },
        {
        where: {
            id: req.params.id,
            }
        });

        if (!updatePostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;