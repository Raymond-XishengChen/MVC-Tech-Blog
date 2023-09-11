const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const sequelize = require("../config/config");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req,res) => {
    Post.findAll({
        where: { userId: req.session.userId },
        attributes: ["id", "title", "content"],
        include: [
            { model: Comment,
              attributes: ["id", "comment", "postId", "userId"],
              include: { model: User,
                         attributes: ["username"]
                        }
            }
        ]
    })
    .then ((postData) => {
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", { posts, 
                                  loggedIn: true, 
                                  username: req.session.username });
    }) 
    .catch ((err) => {
        res.status(500).json(err);
    })
})

router.get("/edit/:id", withAuth, (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ["id", "title", "content"],
        include: [
            { model: Comment,
              attributes: ["id", "comment", "postId", "userId"],
              include: { model: User,
                         attributes: ["username"]
                        }
            }
        ]
    })
    .then ((postData) => {
        if (!postData) {
            res.status(404).json({ message: "No post found with this id!"});
            return;
        }
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("dashboard", { posts, 
                                  loggedIn: true, 
                                  username: req.session.username });
    }) 
    .catch ((err) => {
        res.status(500).json(err);
    })
})

router.get("/new", withAuth, (req, res) => {
    res.render("new-post", 
                { username: req.session.username });
})

module.exports = router;