const { Comment } = require("../models");

const commentSeedData = [
    {
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum alias, quisquam velit nulla dolores dolorum rem obcaecati aliquam vero numquam assumenda consequatur deleniti soluta illo.",
        userId: "1",
        postId: "1",
    }
];

const seedComment = () => Comment.bulkCreate(commentSeedData);

module.exports = seedComment;