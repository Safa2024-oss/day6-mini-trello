function TaskCard({ task, onDelete, onDragStart }) {
  return (
    <div className="task-card" draggable onDragStart={() => onDragStart(task.id)}>
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>✕</button>
    </div>
  );
}

export default TaskCard;