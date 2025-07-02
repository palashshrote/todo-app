import { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";

const initialTasks = [
  {
    id: 1,
    description: "Practise yoga",
    completed: true,
    deadline: "2024-07-02T07:00:00",
  },
  {
    id: 2,
    description: "Smash the court",
    completed: false,
    deadline: "2024-07-02T19:00:00",
  },
  {
    id: 3,
    description: "Bring grocery",
    completed: false,
    deadline: "2024-07-01T17:00:00",
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  function addNewTask(newTask) {
    var withId = { ...newTask, id: tasks.length + 1 };
    console.log(withId);
    setTasks([...tasks, withId]);
  }
  return (
    <div className="app">
      <Header />
      <Form onAddNewTask={addNewTask} />
    </div>
  );
}
