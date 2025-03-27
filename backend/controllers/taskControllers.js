import Task from "../models/Task.js";
import mongoose from "mongoose";
import User from "../models/User.js";
//create tasks (only the admin can create tasks)
export const createTask = async (req, res) => {
  try{
    const { title, description, date, priority, stage, team } = req.body;
    const newTask = new Task({
      title,
      description: description, // map description to desciption
      date,
      priority: priority || "normal",
      stage: stage || "todo",
      team,
    });
    await newTask.save();
    res.status(201).json({message:"Task created successfully",newTask})
  }catch(error){
    res.status(500).json({message:error.message})
    console.log(error,"error in createTask")
  }
}
//get user's tasks
export const getUserTasks = async (req, res) => {
  try{
    const userId = req.user.userId;
    const tasks= await Task.find({team:userId}).populate("team","name email");
    res.status(200).json(tasks);  

  } catch(error){
    res.status(500).json({message:error.message})
    console.log(error,"error in getUserTasks")
  }
}

// 📌 Update task details
export const updateTask = async (req, res) => {
  try {
    const { title,description, priority, stage } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (stage) task.stage = stage;

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 📌 Delete a task (soft delete by moving to trash)
export const deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
// console.log("id",req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     task.isTrashed = true;
//     await task.save();

//     res.status(200).json({ message: "Task moved to trash" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }

try {
  const { id } = req.params;
  console.log("Deleting task with ID:", id);

  const deletedTask = await Task.findByIdAndDelete(id);
  
  if (!deletedTask) {
    console.log("Task not found");
    return res.status(404).json({ message: "Task not found" });
  }

  console.log("Task deleted successfully");
  res.json({ message: "Task deleted successfully" }); // 🚨 TOUJOURS RENVOYER DU JSON
} catch (error) {
  console.error("Error deleting task:", error);
  res.status(500).json({ error: "Internal Server Error" });
}
};
//add an activity to a task
export const addTaskActivity = async (req, res) => {
  try{
    const {type,activity}=req.body;
    const userId= req.user.id;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    const newActivity = { type, activity, date:new Date(),by:userId};
    task.activities.push(newActivity);
    await task.save();  
    res.status(201).json({message:"Activity added successfully",task}); 
  }catch(error){
    res.status(500).json({message:error.message})
    console.log(error,"error in addTaskActivity")
  }
};  
//get all tasks for the admin
export const getAllTasks = async (req, res) => {
  try {
    const tasks= await Task.find({isTrashed:false});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
}