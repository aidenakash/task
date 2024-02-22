const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fakerDataGenerator = require("./fakeDataGenerator");

const fakeUsers = require("./fakerData/router");

app.use(express.json()); //Parsing Incoming JSON Data:
app.use((req, res, next) => {
  //Middleware for Request Logging and Timing:
  req.requestTime = new Date().toString();
  console.log({ reqTime: req.requestTime, reqHeader: req.headers });
  next();
});

app.use("/user", fakeUsers);

 mongoose.connect(
      "mongodb+srv://Akash:05121998@cluster0.b9jwp.mongodb.net/task?retryWrites=true&w=majority"
    ).then(()=>console.log("DB Connected!!"))
    .catch((error)=>console.log(error.message))
   
//fakerDataGenerator.generateUsers(1000) /// create fake Data

const port = 6000;
app.listen(port, () => {
  console.log(`server started & port is : ${port}`);
});
