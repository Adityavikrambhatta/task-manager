const express = require('express');
const routes = express().routes;
const app = express();
const taskList = require('./task_list.json');
const PORT = 3000;
const Validations = require('./helpers/validations.js')
const fs = require('fs');


app.use(express.json())

app.get('/',(req, res)=>{
    console.log("Home")
    return res.status(200).send("Server  Initialised .");
})

app.get('/tasks', (req,res)=>{
    console.log("Tasks")
    return res.status(200).json(taskList);
})

app.get('/tasks/:id', (req,res)=>{
    const taskManagerList =  taskList.tasks;
    let filteredTaskList = taskManagerList.filter( task => task.id == req.params.id )
    if (filteredTaskList.length == 0) {
        return res.status(404).send(" No appropriate task found for your query");
    }
    console.log("Tasks")
    return res.status(200).json(filteredTaskList);
}) 


app.post("/tasks", (req,res)=>{
    const userProvidedDetails = req.body
    if (Validations.validateTask(userProvidedDetails).status == true ){

        taskList.tasks.push(userProvidedDetails)
        fs.writeFile("../json_files/task_list.json", JSON.stringify(taskList), {encoding : 'utf8', flag : 'w'}, (err,data)=>{
            if(err){
                return res.status(500).send("Something went wrong while writing the task to the file, please try recreating the task")
            }else{
                
                return res.status(201).send("Task has been successfully validated and created")
            }
        })
    }else {
        res.status( 400 ).json(Validations.validateTask(userProvidedDetails));
    }
})

app.put('/tasks/:id', (req, res) => {

    const taskManagerList =  taskList.tasks;
    const  updateInData = req.body
    const taskId = parseInt(req.params.id);
    const filteredTaskList =  taskManagerList.filter(task => task.id == taskId)
    console.log(filteredTaskList)
    if (  filteredTaskList[0].id === taskId ) {
        taskManagerList.map((task, iter)=>{
            if(task.id == taskId){
                task  = { ...updateInData, ...task   }   
            }
        })
            fs.writeFile("../json_files/task_list.json", JSON.stringify(taskManagerList), {encoding : 'utf8', flag : 'w'}, (err,data)=>{
                if(err){
                    return res.status(500).send("Something went wrong while writing the task to the file, please try recreating the task")
                }else{
                    
                    return res.status(201).send("Task has been successfully updated.")
                }
            })
    } else {
      res.status(404).json({ message: "Data Not Found "});
    }

});


app.delete('/tasks/:id', (req, res)=>{

    const taskManagerList = taskList.tasks;
    console.log(taskList);
    let filteredIndex = -1;
    taskManagerList.map( (task , iter)=> {
        if( task.id ==  req.params.id){
            filteredIndex = iter
        }
    })
    if (filteredIndex == -1) {
        return res.status(404).send(" Cannot delete no appropriate task id found for your query.");
    }
    else {

        taskManagerList.splice(filteredIndex, 1)
        fs.writeFile("../json_files/task_list.json", JSON.stringify(taskManagerList), {encoding : 'utf8', flag : 'w'}, (err,data)=>{
            if(err){
                return res.status(500).send("Something went wrong while writing the task to the file, please try recreating the task")
            }else{
                
                return res.status(201).send("Task has been successfully and created.")
            }
        })
    }

})


app.listen(PORT, (err) =>{
    if(err){
        console.log("Error occured cannot start the server");
    } else{
        console.log("Stated the server");
    }
});
