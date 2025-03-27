import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import AddActivity from "./AddActivity ";

const TasksDashbord = () => {
  const [tasks, setTasks] = useState([]); // State for tasks
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For handling errors
  const [selectedTaskId, setSelectedTaskId] = useState(null); // To track which task to add activity to
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false); // To toggle the AddActivity form

  // Fetch tasks from API
  const displayTasks = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No token found, please login.");
      setLoading(false);
      return;
    }

    console.log("Token:", token);

    try {
      const response = await fetch("http://localhost:9000/api/task/getUserTasks", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include", // Ensure cookies are included if needed
      });

      const data = await response.json();
      console.log("Fetched Tasks:", data);

      if (data) {
        setTasks(data); // Set the fetched tasks
      } else {
        setError("No tasks found.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("An error occurred while fetching tasks.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Function to add activity to task
  const addActivity = async (taskId, activityData) => {
    const token = localStorage.getItem("authToken");
  
    // Check if taskId is valid before sending the request
    if (!taskId) {
      console.error("Invalid taskId:", taskId);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:9000/api/task/addActivity/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(activityData),
      });
  
      const data = await response.json();
      console.log("Activity added:", data);
  
      if (data && data.task) {
        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? data.task : task
        );
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };
  

  const openAddActivityForm = (taskId) => {
    if (taskId) {
      setSelectedTaskId(taskId);  // Set selected task ID
      setIsAddActivityOpen(true); // Open the activity form
    } else {
      console.error("Task ID is missing.");
    }
  };

  // Function to close AddActivity form
  const closeAddActivityForm = () => {
    setIsAddActivityOpen(false);
    setSelectedTaskId(null);
  };

  useEffect(() => {
    displayTasks(); // Fetch tasks when component mounts
  }, []); // Empty dependency array means this will run once

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="font-semibold text-2xl text-gray-700">Hello</h3>
      <h2 className="text-lg font-bold text-gray-600 mt-2">
        You've got <span className="text-yellow-500">{tasks.length} tasks</span> today!!
      </h2>

      {/* Tasks Section */}
      <h1 className="text-xl font-bold mt-6 text-red-800">My Tasks</h1>

      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <ul className="flex mt-2 gap-4">
            <li className="text-gray-500 cursor-pointer hover:text-black">Recently</li>
            <li className="text-gray-500 cursor-pointer hover:text-black">Today</li>
            <li className="text-gray-500 cursor-pointer hover:text-black">Upcoming</li>
            <li className="text-gray-500 cursor-pointer hover:text-black">Later</li>
          </ul>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Mapping through tasks */}
            {tasks.length > 0 ? (
              tasks.map((task) => (
               
                <TaskCard
                  key={task._id}
                  task={task}
                  onAddActivity={openAddActivityForm}
                />
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </div>
      )}

      {/* Add Activity Modal */}
      {isAddActivityOpen && (
        <AddActivity
          taskId={selectedTaskId}
          onAddActivity={addActivity}
          onClose={closeAddActivityForm}
        />
      )}
    </div>
  );
};

export default TasksDashbord;
