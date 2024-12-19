#!/usr/bin/env node

const fs = require('fs');
const filePath = './tasks.json';

// Helper function to load tasks
const loadTasks = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Helper function to save tasks
const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// CLI Arguments
const [,, command, ...args] = process.argv;

const handleCommand = () => {
  const tasks = loadTasks();

  switch (command) {
    case 'add':
      const title = args.join(' ');
      if (!title) return console.log('Task title is required.');
      const newTask = { id: tasks.length + 1, title, status: 'todo' };
      tasks.push(newTask);
      saveTasks(tasks);
      console.log(`Task added successfully (ID: ${newTask.id})`);
      break;

    case 'update':
      const [updateId, ...newTitleParts] = args;
      const newTitle = newTitleParts.join(' ');
      if (!updateId || !newTitle) return console.log('Task ID and new title are required.');
      const taskToUpdate = tasks.find(task => task.id == updateId);
      if (!taskToUpdate) return console.log('Task not found.');
      taskToUpdate.title = newTitle;
      saveTasks(tasks);
      console.log(`Task updated successfully (ID: ${updateId})`);
      break;

    case 'delete':
      const deleteId = args[0];
      if (!deleteId) return console.log('Task ID is required.');
      const updatedTasks = tasks.filter(task => task.id != deleteId);
      if (updatedTasks.length === tasks.length) return console.log('Task not found.');
      saveTasks(updatedTasks);
      console.log(`Task deleted successfully (ID: ${deleteId})`);
      break;

    case 'mark-in-progress':
      const inProgressId = args[0];
      if (!inProgressId) return console.log('Task ID is required.');
      const taskToMarkInProgress = tasks.find(task => task.id == inProgressId);
      if (!taskToMarkInProgress) return console.log('Task not found.');
      taskToMarkInProgress.status = 'in-progress';
      saveTasks(tasks);
      console.log(`Task marked as in progress (ID: ${inProgressId})`);
      break;

    case 'mark-done':
      const doneId = args[0];
      if (!doneId) return console.log('Task ID is required.');
      const taskToMarkDone = tasks.find(task => task.id == doneId);
      if (!taskToMarkDone) return console.log('Task not found.');
      taskToMarkDone.status = 'done';
      saveTasks(tasks);
      console.log(`Task marked as done (ID: ${doneId})`);
      break;

    case 'list':
      if (args[0] === 'done') {
        console.log('Done tasks:', tasks.filter(task => task.status === 'done'));
      } else if (args[0] === 'todo') {
        console.log('Todo tasks:', tasks.filter(task => task.status === 'todo'));
      } else if (args[0] === 'in-progress') {
        console.log('In-progress tasks:', tasks.filter(task => task.status === 'in-progress'));
      } else {
        console.log('All tasks:', tasks);
      }
      break;

    default:
      console.log(`
Invalid command. Available commands:
  # Add a task
  task-cli add "Task Title"

  # Update a task
  task-cli update <ID> "New Task Title"

  # Delete a task
  task-cli delete <ID>

  # Mark a task
  task-cli mark-in-progress <ID>
  task-cli mark-done <ID>

  # List tasks
  task-cli list
  task-cli list done
  task-cli list todo
  task-cli list in-progress
      `);
  }
};

handleCommand();
