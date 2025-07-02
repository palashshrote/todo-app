// export default function List({
//   type,
//   tasks,
//   handleToggleComplete,
//   handleRemoveTask,
//   readyForEdit,
// }) {
//   function getTimeMessage(task) {
//     const now = new Date();
//     const due = new Date(task.deadline);
//     const finishedBefore = new Date(task.updatedAt) - due;
//     const diffMs = Math.abs(due - now); // always positive
//     const isPast = due < now;

//     var minutes = Math.floor(diffMs / (1000 * 60)) % 60;
//     var hours = Math.floor(diffMs / (1000 * 60 * 60));

//     if (task.status === "success" && !isPast) {
//       minutes = Math.floor(finishedBefore / (1000 * 60)) % 60;
//       hours = Math.floor(finishedBefore / (1000 * 60 * 60));
//     }

//     const timeStr = `${hours}h ${minutes}m`;

//     if (task.status === "success")
//       return isPast ? `✅ Done ${timeStr} late` : `✅ Done ${timeStr} early`;

//     if (task.status === "ongoing" && isPast) return `⌛ Late by ${timeStr}`;
//     if (task.status === "ongoing") return `⏳ In ${timeStr}`;

//     return "";
//   }

//   return (
//     <div className="list-item">
//       <h2>{type}</h2>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             <p>
//               <input
//                 type="checkbox"
//                 defaultChecked={task.status === "success"}
//                 onChange={() => handleToggleComplete(task.id)}
//               />
//               <br />
//               <button onClick={() => handleRemoveTask(task.id)}>-</button>
//               <br />
//               <button onClick={() => readyForEdit(task.id)}>✏️</button>
//               {task.title}
//               <br />
//               {task.description}
//               {"---"}
//               {getTimeMessage(task)}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default function List({
  type,
  tasks,
  handleToggleComplete,
  handleRemoveTask,
  readyForEdit,
}) {
  // Helper function to generate deadline info text
  function getTimeMessage(task) {
    const now = new Date();
    const due = new Date(task.deadline);
    const isPast = due < now;
    const finishedBefore = new Date(task.updatedAt) - due;
    const diffMs = Math.abs(due - now);

    let minutes = Math.floor(diffMs / (1000 * 60)) % 60;
    let hours = Math.floor(diffMs / (1000 * 60 * 60));

    if (task.status === "success" && !isPast) {
      minutes = Math.floor(finishedBefore / (1000 * 60)) % 60;
      hours = Math.floor(finishedBefore / (1000 * 60 * 60));
    }

    const timeStr = `${hours}h ${minutes}m`;

    if (task.status === "success") {
      return isPast ? `✅ Done ${timeStr} late` : `✅ Done ${timeStr} early`;
    }

    if (task.status === "ongoing" && isPast) return `⌛ Late by ${timeStr}`;
    if (task.status === "ongoing") return `⏳ In ${timeStr}`;

    return "";
  }

  return (
    <div className="list-item">
      <h2>{tasks.length > 0 && type}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-card">
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
