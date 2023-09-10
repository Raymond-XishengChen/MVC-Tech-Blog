const { Post } = require("../models");

const postSeedData = [
    {
        title: "Lorem 1",
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quasi quaerat expedita commodi, dolores sit qui amet facere in incidunt",
        userId: "1",
    }
];

const seedPost = () => Post.bulkCreate(postSeedData);

module.exports = seedPost;