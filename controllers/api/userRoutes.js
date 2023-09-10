const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.status(201).json({ message: `Successfully created accoutn for ${userData.username}`});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username }
        });
        if(!userData) {
            res.status(400).json({ message: "Invalid user name or password!"});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword){
            res.status(400).json({ message: "Invalid user name or password!"});
            return;
        }
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.status(200).json({ message: `Welcome ${userData.username}! You are logged in!`})
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/logout", withAuth, async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const userData = await req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(400).end();
    }
});

module.exports = router;