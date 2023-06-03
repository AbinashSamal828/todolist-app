const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    id: {
        type:String,
        required:true
    },
    userid:{
        type:String,
            required:true
    },
    title:{
        type:String,
            required:true
    },
    dueDate:{
            type:String,
    },
    completed:{
        type:Boolean,
        require:true,
    }
  }
);
module.exports = mongoose.model("Tasks", taskSchema);
