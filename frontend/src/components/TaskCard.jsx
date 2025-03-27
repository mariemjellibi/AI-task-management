const TaskCard = ({ task, onAddActivity }) => {
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="group relative bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border-l-6 border-yellow-400">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{task.title}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>{task.priority}</span>
      </div>
      <p>{task.description}</p>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <svg
          className="w-4 h-4 mr-2 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{new Date(task.date).toLocaleDateString()}</span>
      </div>

      {/* Display activities */}
      <div className="mt-4">
        {task.activities && task.activities.length > 0 ? (
          <div>
            <h4 className="font-semibold text-sm text-gray-600">Activities:</h4>
            <ul className="list-disc pl-5">
              {task.activities.map((activity, index) => (
                <li key={index} className="text-sm text-gray-700">
                  <strong>{activity.type}:</strong> {activity.activity}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No activities yet.</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
          {task.stage}
        </span>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded-lg" onClick={() => onAddActivity(task._id)}>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
