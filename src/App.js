import { useState } from 'react';
import Column from './Column';
import { useTheme } from './ThemeContext';
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
  const { theme, toggleTheme } = useTheme();

  function addTask() {
    if (newTaskText.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText, status: 'todo' }]);
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
    <div className={`app ${theme}`}>
      <h1>Kanban Board</h1>

      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

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
          <Column
            key={column.id}
            column={column}
            tasks={tasks}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDelete={deleteTask}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
}

export default App;