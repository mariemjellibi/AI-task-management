import { useState, useEffect } from "react";
import AdminDashbord from "../components/AdminDashbord";

const AdminPage = () => {
  const [team, setTeam] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "", // matches your Task model field
    date: "",       // required date field
    priority: "normal",
    stage: "todo",
    team: [],
  });
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSelectMember = (member) => {
    // console.log("Attempting to add member:", member);
    if (!selectedMembers.some((m) => m._id === member._id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (member) => {
    setSelectedMembers(selectedMembers.filter((m) => m._id !== member._id));
  };

  // Fetch the team data
  const fetchTeam = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:9000/api/user/teamlist", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setTeam(data);
      } else {
        console.error("Failed to fetch team data");
      }
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleAddTask = async () => {
    const token = localStorage.getItem("authToken");

    console.log("New Task:", newTask);

    // Check for required fields
    if (!newTask.title || !newTask.description || !newTask.date || selectedMembers.length === 0) {
      console.log("Missing required fields.");
      return;
    }

    try {
      // Map selected members to their _id's only
      const teamIds = selectedMembers.map(member => member._id); //dont forget here the map  return an array that have the same length as the selectedMembers array but ontains only the ids of the selected members

      const response = await fetch("http://localhost:9000/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newTask, team: teamIds }),
      });
      console.log("newTask", newTask);
      console.log("Response:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Task added:", data);

        // Reset task and selected members
        setNewTask({ title: "", description: "", priority: "normal", stage: "todo", date: "" });
        setSelectedMembers([]);
      } else {
        console.error("Failed to add task:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Task Creation Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create New Task</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Task Title *</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleTaskChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Due Date *</label>
              <input
                type="date"
                name="date"
                value={newTask.date}
                onChange={handleTaskChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Description *</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleTaskChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent h-32"
              placeholder="Task description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Priority</label>
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleTaskChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Team Members *</label>
              <div className="relative">
                <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg">
                  {selectedMembers.length === 0 && (
                    <span className="text-gray-400 text-sm">Select team members...</span>
                  )}
                  {selectedMembers.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                    >
                      {member.name}
                      <button
                        onClick={() => handleRemoveMember(member)}
                        className="ml-2 text-yellow-600 hover:text-yellow-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Available Team Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {team.map((member) => (
                <button
                  key={member._id}
                  onClick={() => handleSelectMember(member)}
                  className={`p-2 rounded-lg text-left transition-colors ${
                    selectedMembers.some(m => m._id === member._id)
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {member.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddTask}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Create Task
          </button>
        </div>

        {/* Tasks Display Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Tasks Overview</h2>
          <AdminDashbord />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
