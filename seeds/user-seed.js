const { User } = require("../models");

const userSeedData = [
    {
        username: "John",
        password: "john123",
    }
];

const seedUser = () => User.bulkCreate(userSeedData);

module.exports = seedUser;