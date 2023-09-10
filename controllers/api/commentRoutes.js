const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        if (commentData.length === 0){
            res.status(404).json({ message: "There is no comment found!"});
            return;
        };
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: { id: req.params.id },
        });
        if (commentData.length === 0){
            res.status(404).json({ message: `There is no comment found for ID ${req.params.id}!`});
            return;
        };
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", withAuth, async (req, res) => {
    const body = req.body;
    try {
        const commentData = await Comment.create({
            ...body,
            userId: req.session.userId,
        });
        res.status(200).json({ commentData, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {id: req.params.id},
        });
        if (!commentData) {
            res.status(404).json({ message: `There is no comment found for ID ${req.params.id}!`});
            return;
        }
        res.status(200).json({ commentData, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;