const express = require("express");
const app = express();

const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");

const PORT = 5000;

require("dotenv").config();
//MONGO_URL = "mongodb+srv://samjimy7u:MDWHanZkPu98q8HY@cluster0.drmhdog.mongodb.net/todoapp?retryWrites=true&w=majority"
app.use(express.json());
app.use(express.static("./public"))

app.use("/api/v1/tasks",taskRoute);

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(process.env.PORT || PORT,console.log("Server start up!"));
    } catch(err){
        console.log(err);
    }
};

start();
