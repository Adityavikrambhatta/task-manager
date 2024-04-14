const _ = require("lodash") 
class Validations {
  static validateTask(taskInfo) {
    if (
      taskInfo.hasOwnProperty("title") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.hasOwnProperty("completed") &&
      typeof taskInfo.title == "string" &&
      typeof taskInfo.description == "string" &&
      typeof taskInfo.completed == "boolean"
    ) { 
      return {
        status: true,
        message: "The course has been validated",
      };
    } else {
      return {
        status: false,
        message:
          "Course info is malformed, please provide me all the parameters",
      };
    }
  }
  static validatePutTask(taskInfo) {
    var valid_prop = []
    
    if( 
      taskInfo.hasOwnProperty("title") &&
      typeof taskInfo.title == "string" 
    ) valid_prop.push({title : "string"})
    if(taskInfo.hasOwnProperty("description") 
       &&
      typeof taskInfo.description == "string" 
    )  valid_prop.push({description : "string"})
    if( 
      taskInfo.hasOwnProperty("completed") &&
      typeof taskInfo.completed == "boolean"
    ) valid_prop.push({completed : "boolean"})

    if(valid_prop.length === _.keys(taskInfo).length) 
     {
      return {
        status: true,
        message: "The course has been validated",
      };
    } else {
      return {
        status: false,
        message:
          "Course info is malformed, please provide me all the parameters",
      };
    }
  }
}

module.exports = Validations;
