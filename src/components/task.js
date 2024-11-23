import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material'; // Material-UI example

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Create a new task
  const createTask = async () => {
    try {
      await axios.post('http://localhost:5000/tasks', newTask);
      setNewTask({ title: '', description: '' }); // Reset input fields
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Update task completion status
  const updateTask = async (taskId, completed) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, { completed });
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when component mounts
  }, []);

  return (
    <div>
      <h2>Task Manager</h2>
      <TextField
        label="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <TextField
        label="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <Button onClick={createTask} onTouch={createTask}  onTouchStart={createTask} >Add Task</Button>
      
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <Button onClick={() => updateTask(task._id, !task.completed)}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </Button>
            <Button onClick={() => deleteTask(task._id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
