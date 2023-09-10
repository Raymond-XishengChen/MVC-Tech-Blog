const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({});
        if (postData.length === 0){
            res.status(404).json({ message: "There is no post found!"});
            return;
        };
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { id: req.params.id },
        });
        if (postData.length === 0){
            res.status(404).json({ message: `There is no post found for ID ${req.params.id}!`});
            return;
        };
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...body,
            userId: req.session.userId,
        });
        res.status(200).json({ postData, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            { titel: req.body.title,
            content: req.body.content,},
            { where: { id: req.params.id}},
        );
        if (!postData) {
            res.status(404).json({ message: `There is no post found with this ID ${req.params.id}!`});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: { id: req.params.id,
            userId: req.session.userId },
        });
        if (!postData) {
            res.status(404).json({ message: `There is no post found for ID ${req.params.id}!`});
            return;
        }
        res.status(200).json({ postData, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;