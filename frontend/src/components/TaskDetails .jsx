
const TaskDetails = ({ task }) => {
    return (
      <div className="task-details">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p>Priority: {task.priority}</p>
        <p>Stage: {task.stage}</p>
        <p>Due Date: {new Date(task.date).toLocaleDateString()}</p>
        <h3>Activities:</h3>
        <ul>
          {task.activities.map((activity, index) => (
            <li key={index}>
              <strong>{activity.type}:</strong> {activity.activity}{" "}
              <small>{new Date(activity.date).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
        <h3>Assets:</h3>
        <ul>
          {task.assests.map((asset, index) => (
            <li key={index}>{asset}</li>
          ))}
        </ul>
        <h3>Team Members:</h3>
        <ul>
          {task.team.map((memberId, index) => (
            <li key={index}>User ID: {memberId}</li> // Replace with actual user data if needed
          ))}
        </ul>
      </div>
    );
  };
  
  export default TaskDetails;
  
