const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const pathRouters = path.join( __dirname ,"src","routers", "taskManagers.js");
const routeTaskManagers = require(pathRouters);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',routeTaskManagers);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
