export default function List({
  type,
  tasks,
  handleToggleComplete,
  handleRemoveTask,
}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <p>
            <input
              type="checkbox"
              defaultChecked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <br />
            <button onClick={() => handleRemoveTask(task.id)}>-</button>
            {task.description}
            {"---"}
            {task.deadline}
          </p>
        </li>
      ))}
    </ul>
  );
}
