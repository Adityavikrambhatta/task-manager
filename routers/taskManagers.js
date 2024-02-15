const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path")

const pathHelpers = path.join("..","helpers", "validations.js") 
const pathTaskList = path.join("..", "task.json") 
const taskList = require(pathTaskList)

const Validations = require(pathHelpers);

router.get("/", (req, res) => {
  return res.status(200).send("<HTML><h1>Server  Initialised .</h1></HTML>");
});

router.get("/tasks", (req, res) => {
  return res.status(200).json(taskList);
});

router.get("/tasks/:id", (req, res) => {
  const taskManagerList = taskList.tasks;
  let filteredTaskList = taskManagerList.filter(
    (task) => task.id == req.params.id
  );
  if (filteredTaskList.length == 0) {
    return res.status(404).send(" No appropriate task found for your query");
  }
  console.log("Get Tasks ID");
  return res.status(200).json(filteredTaskList);
});

router.post("/tasks", (req, res) => {
  console.log("Post Tasks");
  const userProvidedDetails = req.body;
  if (Validations.validateTask(userProvidedDetails).status == true) {
    taskList.tasks.push(userProvidedDetails);
    fs.writeFile(
      "./task.json",
      JSON.stringify(taskList),
      { encoding: "utf8", flag: "w" },
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .send(
              "Something went wrong while writing the task to the file, please try recreating the task"
            );
        } else {
          return res
            .status(201)
            .send("Task has been successfully validated and created");
        }
      }
    );
  } else {
    res.status(400).json(Validations.validateTask(userProvidedDetails));
  }
});

router.put("/tasks/:id", (req, res) => {
  console.log("Put Tasks");

  const taskManagerList = taskList.tasks;
  const updateInData = req.body;
  const taskId = parseInt(req.params.id);
  const filteredTaskList = taskManagerList.filter((task) => task.id == taskId);
  console.log(filteredTaskList);
  if (filteredTaskList[0].id === taskId) {
    taskManagerList.map((task, iter) => {
      if (task.id == taskId) {
        task = { ...updateInData, ...task };
      }
    });
    fs.writeFile(
      "./task.json",
      JSON.stringify(taskManagerList),
      { encoding: "utf8", flag: "w" },
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .send(
              "Something went wrong while writing the task to the file, please try recreating the task"
            );
        } else {
          return res.status(201).send("Task list has been successfully updated.");
        }
      }
    );
  } else {
    res.status(404).json({ message: "Couldn't find the correct id in the task list for update. " });
  }
});

router.delete("/tasks/:id", (req, res) => {
  console.log("Delete Tasks ID");

  const taskManagerList = taskList.tasks;
  console.log(taskList);
  let filteredIndex = -1;
  filteredIndex = taskManagerList.findIndex((task) => task.id == req.params.id);

  if (filteredIndex == -1) {
    return res
      .status(404)
      .send(" Cannot delete no appropriate task id found for your query.");
  } else {
    taskManagerList.splice(filteredIndex, 1);
    fs.writeFile(
      "./task.json",
      JSON.stringify(taskManagerList),
      { encoding: "utf8", flag: "w" },
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .send(
              "Something went wrong while deleting the task from the file, please check the task list."
            );
        } else {
          return res
            .status(201)
            .send("Task has been successfully executed and the Id has been deleted.");
        }
      }
    );
  }


});

module.exports = router;