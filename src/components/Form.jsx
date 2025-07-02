import { useEffect, useState } from "react";

export default function Form({ onAddNewTask, onEditTask, edit, taskToEdit }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  useEffect(() => {
    if (edit) {
      setTaskTitle(taskToEdit.title || "");
      setTaskDescription(taskToEdit.description || "");
      setNewDeadline(taskToEdit.deadline || "");
    }
  }, [edit, taskToEdit]);
  function handleFormSubmission(e) {
    e.preventDefault();
    // console.log(newTask, newDeadline);
    if (edit) {
      const editPayload = {
        ...taskToEdit,
        title: taskTitle,
        description: taskDescription,
        deadline: newDeadline,
        updatedAt: Date.now().toString(),
      };
      onEditTask(editPayload);
    } else {
      const taskPayload = {
        title: taskTitle,
        description: taskDescription,
        status: "ongoing",
        deadline: newDeadline,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      };
      onAddNewTask(taskPayload);
    }
    setTaskTitle("");
    setTaskDescription("");
    setNewDeadline("");
  }
  return (
    <form onSubmit={handleFormSubmission}>
      <input
        value={taskTitle}
        placeholder="Enter title"
        type="text"
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <input
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        type="text"
        placeholder="Enter description..."
      />
      <input
        value={newDeadline}
        onChange={(e) => setNewDeadline(e.target.value)}
        type="datetime-local"
        id="myDateTime"
        name="myDateTime"
        placeholder="Set deadline"
      />
      <button type="submit">{edit ? "Save Changes" : "Add Task"}</button>
    </form>
  );
}
