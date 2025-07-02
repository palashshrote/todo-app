import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import ListView from "./components/ListView";

const initialTasks = [
  {
    id: 1,
    description: "Practise yoga",
    completed: true,
    deadline: "2025-07-02T07:00:00",
  },
  {
    id: 2,
    description: "Smash the court",
    completed: false,
    deadline: "2025-07-02T21:00:00",
  },
  {
    id: 3,
    description: "Bring grocery",
    completed: false,
    deadline: "2025-07-01T17:00:00",
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  function addNewTask(newTask) {
    var withId = { ...newTask, id: tasks.length + 1 };
    console.log(withId);
    setTasks([...tasks, withId]);
  }
  function onHandleToggleComplete(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }
  function onRemoveTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  return (
    <div className="app">
      <Header />
      <Form onAddNewTask={addNewTask} />
      <ListView
        handleRemoveTask={onRemoveTask}
        handleToggleComplete={onHandleToggleComplete}
        tasks={tasks}
      />
    </div>
  );
}
