const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // The following options are deprecated, use the corresponding methods instead
    // useCreateIndex: true,
    // useFindAndModify: false
});


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection success!!!");
});

const studentRouter = require("./routes/student.js");


app.use("/student", studentRouter);

app.listen(PORT, () => {
    console.log(`Server up and running on port number : ${PORT}`);
});
