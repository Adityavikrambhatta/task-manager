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
      if( 
      taskInfo.hasOwnProperty("title") ||
      taskInfo.hasOwnProperty("description") ||
      taskInfo.hasOwnProperty("completed") ||
      typeof taskInfo.title == "string" &&
      typeof taskInfo.description == "string" &&
      typeof taskInfo.completed == "boolean"
    )
     {
      return {
        status: valid_prop,
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
