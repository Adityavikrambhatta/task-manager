class Validations{
    static validateTask(taskInfo){
        if( taskInfo.hasOwnProperty("id") && 
            taskInfo.hasOwnProperty("title") &&
            taskInfo.hasOwnProperty("description") &&
            taskInfo.hasOwnProperty("completed") )
        {
            return {
                "status" : true,
                "message" : "The course has been validated" 
            }
        }
        else{ 
            return {
                "status" : false,
                "message" : "Course info is malformed, please provide me all the parameters" 
            }
        }                                                                                                                   
    }
}

module.exports = Validations;
