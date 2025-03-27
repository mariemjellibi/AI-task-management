import express from 'express';
import { protectRoute, isAdminRoute } from '../middlewares/authMiddleware.js';

import { createTask, getUserTasks, updateTask, deleteTask,addTaskActivity,getAllTasks } from '../controllers/taskControllers.js';
const router=express.Router();
router.post("/create",protectRoute,isAdminRoute,createTask);
router.delete("/delete/:id",protectRoute,isAdminRoute,deleteTask);
router.put("/update/:id",protectRoute,isAdminRoute,updateTask);
router.post("/addActivity/:id",protectRoute,addTaskActivity);
router.get("/", protectRoute, isAdminRoute, getAllTasks);

router.get("/getUserTasks",protectRoute,getUserTasks);

export default router;