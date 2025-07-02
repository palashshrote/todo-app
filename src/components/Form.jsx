import { useState } from "react";

export default function Form({ onAddNewTask }) {
  const [newTask, setNewTask] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  function handleFormSubmission(e) {
    e.preventDefault();
    // console.log(newTask, newDeadline);
    const taskPayload = {
      description: newTask,
      completed: false,
      deadline: newDeadline,
    };
    onAddNewTask(taskPayload);
  }
  return (
    <form onSubmit={handleFormSubmission}>
      <input
        onChange={(e) => setNewTask(e.target.value)}
        type="text"
        placeholder="Enter task..."
      />
      <input
        onChange={(e) => setNewDeadline(e.target.value)}
        type="datetime-local"
        id="myDateTime"
        name="myDateTime"
        placeholder="Set deadline"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
