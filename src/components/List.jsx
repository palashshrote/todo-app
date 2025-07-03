// Helper function to generate deadline info text
// function getTimeMessage(task) {
//   const now = new Date();
//   const due = new Date(task.deadline);
//   const updated = new Date(task.updatedAt);
//   const isPast = due < now;
//   const finishedBefore = new Date(task.updatedAt) - due;
//   const diffMs = Math.abs(due - now);

//   let minutes = Math.floor(diffMs / (1000 * 60)) % 60;
//   let hours = Math.floor(diffMs / (1000 * 60 * 60));

//   if (task.status === "success") {
//     minutes = Math.floor(finishedBefore / (1000 * 60)) % 60;
//     hours = Math.floor(finishedBefore / (1000 * 60 * 60));
//   }

//   const timeStr = `${hours}h ${minutes}m`;

//   if (task.status === "success") {
//     return updated > due
//       ? `✅ Done ${timeStr} late`
//       : `✅ Done ${timeStr} early`;
//   }

//   if (task.status === "ongoing" && isPast) return `⌛ Late by ${timeStr}`;
//   if (task.status === "ongoing") return `⏳ In ${timeStr}`;

//   return "";
// }
function getTimeMessage(task) {
  const now = new Date();
  const due = new Date(task.deadline);
  const updated = new Date(task.updatedAt);
  const isPast = due < now;

  let diffMs;

  if (task.status === "success") {
    diffMs = Math.abs(updated - due);
  } else {
    diffMs = Math.abs(due - now);
  }

  const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const timeStr = `${hours}h ${minutes}m`;

  if (task.status === "success") {
    return updated > due
      ? `✅ Done ${timeStr} late`
      : `✅ Done ${timeStr} early`;
  }

  if (task.status === "ongoing" && isPast) return `⌛ Late by ${timeStr}`;
  if (task.status === "ongoing") return `⏳ In ${timeStr}`;

  return "";
}

// export default function List({
//   type,
//   tasks,
//   handleToggleComplete,
//   handleRemoveTask,
//   readyForEdit,
// }) {
//   // function getTimeMessage(task) {
//   //   const now = new Date();
//   //   const due = new Date(task.deadline);
//   //   const finishedBefore = new Date(task.updatedAt) - due;
//   //   const diffMs = Math.abs(due - now); // always positive
//   //   const isPast = due < now;

//   //   var minutes = Math.floor(diffMs / (1000 * 60)) % 60;
//   //   var hours = Math.floor(diffMs / (1000 * 60 * 60));

//   //   if (task.status === "success" && !isPast) {
//   //     minutes = Math.floor(finishedBefore / (1000 * 60)) % 60;
//   //     hours = Math.floor(finishedBefore / (1000 * 60 * 60));
//   //   }

//   //   const timeStr = `${hours}h ${minutes}m`;

//   //   if (task.status === "success")
//   //     return isPast ? `✅ Done ${timeStr} late` : `✅ Done ${timeStr} early`;

//   //   if (task.status === "ongoing" && isPast) return `⌛ Late by ${timeStr}`;
//   //   if (task.status === "ongoing") return `⏳ In ${timeStr}`;

//   //   return "";
//   // }

export default function List({
  type,
  tasks,
  handleToggleComplete,
  handleRemoveTask,
  readyForEdit,
}) {
  function getElapsedWidth(task) {
    const now = new Date();
    const start = new Date(task.createdAt);
    const end = new Date(task.deadline);
    const total = end - start;
    const elapsed = now - start;

    if (total <= 0) return 100; // fallback if invalid range

    const percentage = Math.min((elapsed / total) * 100, 100); // clamp to 100%
    return 100 - percentage;
  }
  return (
    <div className="list-item">
      <h3>{tasks.length > 0 && type}</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div
              className="task-card"
              style={{
                background: `linear-gradient(to right, rgba(0, 128, 255, 0.2) ${getElapsedWidth(
                  task
                )}%, transparent ${getElapsedWidth(task)}%)`,
              }}
            >
              <div className="task-controls">
                <input
                  type="checkbox"
                  checked={task.status === "success"}
                  onChange={() => handleToggleComplete(task.id)}
                />
                <button onClick={() => handleRemoveTask(task.id)}>🗑️</button>
                <button onClick={() => readyForEdit(task.id)}>✏️</button>
              </div>
              <div className="task-details">
                <strong>{task.title}</strong>
                <p>{task.description}</p>
                <small>{getTimeMessage(task)}</small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
