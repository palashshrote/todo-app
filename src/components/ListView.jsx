import { useEffect, useState } from "react";
import List from "./List";

export default function ListView({
  tasks,
  handleToggleComplete,
  handleRemoveTask,
  readyForEdit,
}) {
  const [tick, setTick] = useState(0); // dummy state to trigger re-render

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000 * 60); // check every 1 minute (adjust as needed)

    return () => clearInterval(interval); // cleanup
  }, []);

  const ongoingTasks = tasks
    .filter(
      (task) =>
        task.status === "ongoing" && Date.parse(task.deadline) > Date.now()
    )
    .sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));
  const deadlineCrossed = tasks
    .filter(
      (task) =>
        Date.parse(task.deadline) < Date.now() && task.status === "ongoing"
    )
    .sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));

  return (
    <div className="list-view">
      {/* Deadline crossed */}
      <List
        type="Deadline Crossed"
        readyForEdit={readyForEdit}
        tasks={deadlineCrossed}
        handleToggleComplete={handleToggleComplete}
        handleRemoveTask={handleRemoveTask}
      />
      {/* Ongoing */}
      <List
        type="Ongoing"
        readyForEdit={readyForEdit}
        tasks={ongoingTasks}
        handleToggleComplete={handleToggleComplete}
        handleRemoveTask={handleRemoveTask}
      />
      {/* Completed */}
      <List
        type="Completed"
        readyForEdit={readyForEdit}
        tasks={tasks.filter((task) => task.status === "success")}
        handleToggleComplete={handleToggleComplete}
        handleRemoveTask={handleRemoveTask}
      />
    </div>
  );
}
