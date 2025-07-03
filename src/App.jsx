import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import ListView from "./components/ListView";

const initialTasks = [
  {
    id: 1,
    title: "Yoga",
    description: "Practise yoga",
    status: "success",
    deadline: "2025-07-03T07:00:00",
    createdAt: "2025-07-03T05:00:00",
    updatedAt: "2025-07-03T06:00:00",
  },
  {
    id: 2,
    title: "Badminton",
    description: "Smash the court",
    status: "ongoing",
    deadline: "2025-07-03T22:00:00",
    createdAt: "2025-07-03T05:00:00",
    updatedAt: "2025-07-03T05:00:00",
  },
  {
    id: 3,
    title: "RUN",
    description: "Bring grocery",
    status: "ongoing",
    deadline: "2025-07-03T17:00:00",
    createdAt: "2025-07-03T05:00:00",
    updatedAt: "2025-07-03T05:00:00",
  },
  {
    id: 4,
    title: "Print",
    description: "Doc",
    status: "ongoing",
    deadline: "2025-07-02T23:12:00",
    createdAt: "2025-07-01T05:00:00",
    updatedAt: "2025-07-01T05:00:00",
  },
  {
    id: 5,
    title: "De-assemble",
    description:
      "De-assemble cooler into parts for repair and clean the stack space of the cooler",
    status: "success",
    deadline: "2025-07-02T10:12:00",
    createdAt: "2025-07-01T05:00:00",
    updatedAt: "2025-07-02T15:00:00",
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  function addNewTask(newTask) {
    var withId = { ...newTask, id: tasks.length + 1 };
    // console.log(withId);
    setTasks([...tasks, withId]);
  }
  function handleEditTask(editedTask) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  }

  function onHandleToggleComplete(id) {
    // console.log(id);
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          var updatedStatus = task.status === "ongoing" ? "success" : "ongoing";

          return {
            ...task,
            status: updatedStatus,
            updatedAt: Date.now().toString(),
          };
        }
        return task;
      })
    );
  }
  function onRemoveTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  const [edit, setEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
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
