# Task-CLI

A simple Command-Line Interface (CLI) application to manage and track tasks. This tool is ideal for practicing programming skills such as working with filesystems, handling user inputs, and building functional CLIs.

---

## Features

- Add, update, and delete tasks
- Mark tasks as `TODO`, `In Progress`, or `Done`
- List all tasks or filter tasks by status
- Persistent storage using a JSON file in the current directory
- Error handling for invalid inputs and missing files

---

# Task Tracker

Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

## Installation


### 1. Clone the Repository

git clone https://github.com/shaileshdhandhukiya/Task-Tracker-cli.git
cd task-cli

https://roadmap.sh/projects/task-tracker

## Installation

# Add tasks
node task-cli.js add "Complete assignment"
node task-cli.js add "Prepare dinner"

# List tasks
node task-cli.js list

# Update a task
node task-cli.js update 1 "Complete assignment and submit"

# Mark tasks
node task-cli.js mark-in-progress 1
node task-cli.js mark-done 2

# List tasks by status
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done

# Delete a task
node task-cli.js delete 1
