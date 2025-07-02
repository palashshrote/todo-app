import List from "./List";

export default function ListView({
  tasks,
  handleToggleComplete,
  handleRemoveTask,
}) {
  var ongoingTasks = tasks.filter(
    (task) => task.completed === false && Date.parse(task.deadline) > Date.now()
  );
  var deadlineCrossed = tasks.filter(
    (task) => Date.parse(task.deadline) < Date.now() && task.completed === false
  );

  return (
    <div className="list">
      {/* Deadline crossed */}
      <List
        type={"dlCrossed"}
        tasks={deadlineCrossed}
        handleToggleComplete={handleToggleComplete}
        handleRemoveTask={handleRemoveTask}
      />
      {/* Ongoing */}
      <List
        type={"ongoing"}
        tasks={ongoingTasks}
        handleToggleComplete={handleToggleComplete}
        handleRemoveTask={handleRemoveTask}
      />
      {/* Completed */}
      <List
        type={"completed"}
        tasks={tasks.filter((task) => task.completed === true)}
        handleToggleComplete={handleToggleComplete}
        handleRemoveTask={handleRemoveTask}
      />
    </div>
  );
}
