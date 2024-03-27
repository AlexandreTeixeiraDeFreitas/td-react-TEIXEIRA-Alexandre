// TaskList.js
import React from "react";

const TaskList = ({ tasks, toggleTaskCompletion }) => {
  const handleTaskClick = (taskId) => {
    toggleTaskCompletion(taskId);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          className={task.completed ? "completed" : ""}
          onClick={() => handleTaskClick(task.id)}
        >
          {task.text}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
