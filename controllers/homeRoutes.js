const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const sequelize = require("../config/config");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ["id", "title", "content"],
            include: [
                { model: Comment,
                  attributes: ["id", "comment", "postId", "userId"],
                  include: { model: User,
                             attributes: ["username"]},
                }
            ]
        })
        const posts = postData.map((post) => post.get({ plain:true }));
        console.log(posts);
        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            userId: req.session.userId
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ["id", "title", "content"],
            include: [
                { model: Comment,
                  attributes: ["id", "comment", "postId", "userId"],
                  include: { model: User,
                             attributes: ["username"]},
                }
            ]
        }); if (postData){
            const posts = postData.map((post) => post.get({ plain:true }));
            console.log(posts);
            res.render("singlePost", {
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

module.exports = router;