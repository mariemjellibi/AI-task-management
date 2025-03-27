import { useState, useEffect } from "react"

const AdminDashbord = () => {
    const [tasks, setTasks] = useState([]);
    const fetchTasks = async () => {
        try{
            const response = await fetch("http://localhost:9000/api/task",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                }
            })
            const data = await response.json();
            setTasks(data)
console.log("tasks",data)
        }catch(error){
            console.log(error)
        }
    }
    const editTask = () => {
        console.log("Edit Task")
    }
    const deleteTask = async (taskId) => {
      console.log("Delete Task");
      const token = localStorage.getItem("authToken");
      try {
          const response = await fetch(`http://localhost:9000/api/task/delete/${taskId}`, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
              },
          });
  
          const data = await response.json();
          console.log(data);
  
          if (data.success) {
              // Re-fetch the tasks to update the list after deleting a task
              fetchTasks();
          }
      } catch (error) {
          console.log(error);
      }
  };
    useEffect(() => {
        fetchTasks()
    }, [])  
 
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border-l-6 border-yellow-400 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' :
                  task.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {task.priority}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{task.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(task.date).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <span className="mr-2">Status:</span>
                <span className="px-2 py-1 bg-gray-100 rounded-full">{task.stage}</span>
                <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded-lg" onClick={editTask}>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-lg" onClick={() => deleteTask(task._id)} >
            {/* pay attention onClick={deleteTask} means this function will execute immediately  every time the component is rendering  */}
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
              </div>
              
            </div>
          ))}
        </div>
      );
}

export default AdminDashbord