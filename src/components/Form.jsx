import { useEffect, useState } from "react";

export default function Form({ onAddNewTask, onEditTask, edit, taskToEdit }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    if (edit) {
      setTaskTitle(taskToEdit.title || "");
      setTaskDescription(taskToEdit.description || "");
      setNewDeadline(taskToEdit.deadline || "");
    }
  }, [edit, taskToEdit]);
  function getISTDateTimeTFormat() {
    const now = new Date();

    // Get time in IST
    const istTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const yyyy = istTime.getFullYear();
    const mm = String(istTime.getMonth() + 1).padStart(2, "0");
    const dd = String(istTime.getDate()).padStart(2, "0");
    const hh = String(istTime.getHours()).padStart(2, "0");
    const min = String(istTime.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }

  function handleFormSubmission(e) {
    e.preventDefault();
    // console.log(newTask, newDeadline);
    if (edit) {
      const editPayload = {
        ...taskToEdit,
        title: taskTitle,
        description: taskDescription,
        deadline: newDeadline,
        updatedAt: getISTDateTimeTFormat(),
      };
      onEditTask(editPayload);
    } else {
      const taskPayload = {
        title: taskTitle,
        description: taskDescription,
        status: "ongoing",
        deadline: newDeadline,
        createdAt: getISTDateTimeTFormat(),
        updatedAt: getISTDateTimeTFormat(),
      };
      onAddNewTask(taskPayload);
    }
    setTaskTitle("");
    setTaskDescription("");
    setNewDeadline("");
  }
  return (
    <form className="form-input" onSubmit={handleFormSubmission}>
      <input
        value={taskTitle}
        placeholder="Enter title"
        type="text"
        onChange={(e) => setTaskTitle(e.target.value)}
      />

      <textarea
        className="task-textarea"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Enter description..."
        rows={4} // you can adjust this
      />
      <div className="input-deadline">
        <input
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
          type="datetime-local"
          placeholder="Set deadline"
        />
        <button type="submit">{edit ? "Save Changes" : "Add Task"}</button>
      </div>
    </form>
  );
}
