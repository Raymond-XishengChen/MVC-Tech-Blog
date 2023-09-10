const sequelize = require("../config/config");

const seedComment = require("./comment-seeds");
const seedPost = require("./post-seed");
const seedUser = require("./user-seed");

const { Comment, Post, User } = require("../models");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await Comment.bulkCreate(seedComment);
    await Post.bulkCreate(seedPost);
    await User.bulkCreate(seedUser);

    console.log("Finished Seeding Database");
    process.exit(0);
}

seedDatabase();