import { useState } from "react";

const AddActivity = ({ taskId, onAddActivity, onClose }) => {
  const [activityData, setActivityData] = useState({
    type: "",
    activity: "",
  });

  // Handle form input changes
  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setActivityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the activity to the parent component
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, activity } = activityData;

    if (!type || !activity) {
      alert("Please fill out the form.");
      return;
    }

    try {
      await onAddActivity(taskId, activityData);
      onClose(); // Close the form after adding activity
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl font-semibold mb-4">Add Activity</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="type"
              placeholder="Activity Type"
              value={activityData.type}
              onChange={handleActivityChange}
              className="border-2 border-gray-300 p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="activity"
              placeholder="Describe the activity"
              value={activityData.activity}
              onChange={handleActivityChange}
              className="border-2 border-gray-300 p-2 rounded-lg w-full"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Add Activity
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
