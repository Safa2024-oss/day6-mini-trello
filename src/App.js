import { useState } from 'react';
import './App.css';

const initialTasks = [
  { id: 1, text: 'Learn useState', status: 'todo' },
  { id: 2, text: 'Learn useEffect', status: 'todo' },
  { id: 3, text: 'Build todo app', status: 'inProgress' },
  { id: 4, text: 'Build weather app', status: 'done' },
];

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  function addTask() {
    if (newTaskText.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      status: 'todo',
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleDragStart(id) {
    setDraggedTaskId(id);
  }

  function handleDrop(columnId) {
    setTasks(
      tasks.map((task) =>
        task.id === draggedTaskId ? { ...task, status: columnId } : task
      )
    );
    setDraggedTaskId(null);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className="app">
      <h1>Kanban Board</h1>

      <div className="add-task">
        <input
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="board">
        {columns.map((column) => (
          <div
            key={column.id}
            className="column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <h2>{column.title}</h2>
            {tasks
              .filter((task) => task.status === column.id)
              .map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                >
                  <span>{task.text}</span>
                  <button onClick={() => deleteTask(task.id)}>✕</button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;