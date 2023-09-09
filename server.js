
const path = require("path");
const express = require("express");
const sequelize = require("./config/config");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ etended: true}));

app.use(express.static(path.join(__dirname, "public")));

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server started! Listening to port ${PORT}`);
    })
})