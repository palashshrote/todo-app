import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import ListView from "./components/ListView";

//testing purpose
const initialTasks = [
  {
    id: 1,
    title: "Yoga",
    description: "Practise yoga",
    status: "success",
    deadline: "2025-07-03T07:00",
    createdAt: "2025-07-03T05:00",
    updatedAt: "2025-07-03T06:00",
  },
  {
    id: 2,
    title: "Badminton",
    description: "Smash the court",
    status: "ongoing",
    deadline: "2025-07-03T22:00",
    createdAt: "2025-07-03T05:00",
    updatedAt: "2025-07-03T05:00",
  },
  {
    id: 3,
    title: "RUN",
    description: "Bring grocery",
    status: "ongoing",
    deadline: "2025-07-03T17:00",
    createdAt: "2025-07-03T05:00",
    updatedAt: "2025-07-03T05:00",
  },
  {
    id: 4,
    title: "Print out",
    description: "Course/Program outcomes",
    status: "ongoing",
    deadline: "2025-07-02T23:12",
    createdAt: "2025-07-01T05:00",
    updatedAt: "2025-07-01T05:00",
  },
  {
    id: 5,
    title: "Maintenance",
    description:
      "De-assemble cooler into parts for repair and clean the stack space of the cooler",
    status: "success",
    deadline: "2025-07-02T10:12",
    createdAt: "2025-07-01T05:00",
    updatedAt: "2025-07-02T15:00",
  },
];
//IST conversion function
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

export default function App() {
  const [tasks, setTasks] = useState([]);
  //adding new tasks
  function addNewTask(newTask) {
    var withId = { ...newTask, id: tasks.length + 1 };
    // console.log(withId);
    setTasks([...tasks, withId]);
  }
  //for editing
  function handleEditTask(editedTask) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  }
  //for updating completion status
  function onHandleToggleComplete(id) {
    // console.log(id);
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          var updatedStatus = task.status === "ongoing" ? "success" : "ongoing";

          return {
            ...task,
            status: updatedStatus,
            updatedAt: getISTDateTimeTFormat(),
          };
        }
        return task;
      })
    );
  }

  //for removing tasks
  function onRemoveTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  //below two state hooks are for editing tasks, I'm storing that task in a state and passing it to the same form where I'm adding new tasks
  const [edit, setEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});

  //creating editing payload
  function handleTaskEditing(id) {
    //find the task with the given id
    const taskToEdit = tasks.find((task) => task.id === id);
    // console.log(taskToEdit);
    setEdit(true);
    setTaskToEdit(taskToEdit);
  }

  return (
    <div className="app">
      <Header />
      <Form
        edit={edit}
        taskToEdit={taskToEdit}
        onAddNewTask={addNewTask}
        onEditTask={handleEditTask}
      />
      <ListView
        readyForEdit={handleTaskEditing}
        handleRemoveTask={onRemoveTask}
        handleToggleComplete={onHandleToggleComplete}
        tasks={tasks}
      />
    </div>
  );
}
