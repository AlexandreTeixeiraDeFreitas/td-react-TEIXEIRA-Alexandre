// App.js
import "./styles.css";
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    return storedTasks || [];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleFilterAll = () => setFilter("all");
    const handleFilterCompleted = () => setFilter("completed");
    const handleFilterUncompleted = () => setFilter("uncompleted");

    document
      .getElementById("filter-all")
      .addEventListener("click", handleFilterAll);
    document
      .getElementById("filter-completed")
      .addEventListener("click", handleFilterCompleted);
    document
      .getElementById("filter-uncompleted")
      .addEventListener("click", handleFilterUncompleted);

    return () => {
      document
        .getElementById("filter-all")
        .removeEventListener("click", handleFilterAll);
      document
        .getElementById("filter-completed")
        .removeEventListener("click", handleFilterCompleted);
      document
        .getElementById("filter-uncompleted")
        .removeEventListener("click", handleFilterUncompleted);
    };
  }, []);

  const addTask = (taskText) => {
    if (taskText.trim() !== "") {
      const newTask = { id: Date.now(), text: taskText, completed: false };
      setTasks([...tasks, newTask]);
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "uncompleted") {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <div>
      <h1>Todo List</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
      />
      <div>
        <button id="filter-all">All</button>
        <button id="filter-completed">Completed</button>
        <button id="filter-uncompleted">Uncompleted</button>
      </div>
    </div>
  );
};

export default App;
