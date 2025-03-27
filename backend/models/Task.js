import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date:{type:Date, required:true},
    priority: {
        type:String,
        default :"normal",
        enum:["high","meduim","normal","low"]
    },
    stage:{
        type:String,
        default:"todo",
        enum:["todo","doing","done"]
    },
    activities:[{
        type:{
            type:String,
            default:"assigned",
            enum:["assigned","completed","cancelled","started","commented","bug"]
        },
        activity:{
            type:String,
            default:""
        },
        date:{type:Date, required:false},
        by:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }],
    assests:[String],
    team:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    isTrashed:{
        type:Boolean,
        default:false
    }

},{timestamps:true});
const Task=mongoose.model("Task",taskSchema);
export default Task;