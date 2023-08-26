const mongoose = require("mongoose");

const connectDB = (url) => {
    return mongoose
    .connect(url)
    .then(()=> console.log("connecting Mongo DB now..."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
